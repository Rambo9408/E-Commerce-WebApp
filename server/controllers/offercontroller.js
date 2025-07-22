const Offers = require('../models/offers');
const Product = require('../models/product');

const createOffer = async (req, res) => {
    try {
        const { offers, productId } = req.body;

        if (!offers || !productId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const createdOffers = [];

        for (const desc of offers) {
            const offer = new Offers({
                description: desc,
                productID: [productId]
            });
            await offer.save();
            createdOffers.push(offer._id); // store only the _id
        }

        await Product.findByIdAndUpdate(productId, {
            $addToSet: { offerId: { $each: createdOffers } } // avoid duplicates
        });

        res.status(201).json({ message: "Offers created and linked to product", offerIds: createdOffers });
    } catch (err) {
        res.status(500).json({ message: "Error creating offers", error: err.message });
    }
};

const updateOffer = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { offers } = req.body;

        if (!offers || !Array.isArray(offers)) {
            return res.status(400).json({ message: "Invalid offers format" });
        }

        // Step 1: Find all existing offer IDs for the product
        const oldOffers = await Offers.find({ productID: productId });

        // Step 2: Remove product reference from those offers and delete them
        const oldOfferIds = oldOffers.map(o => o._id);

        await Offers.deleteMany({ _id: { $in: oldOfferIds } });

        // Step 3: Remove offer references from Product
        await Product.findByIdAndUpdate(productId, { $pull: { offerId: { $in: oldOfferIds } } });

        // Step 4: Create new offers
        const newOfferIds = [];

        for (const desc of offers) {
            const newOffer = new Offers({
                description: desc,
                productID: [productId]
            });
            await newOffer.save();
            newOfferIds.push(newOffer._id);
        }

        // Step 5: Update product with new offers
        await Product.findByIdAndUpdate(productId, {
            $set: { offerId: newOfferIds }
        });

        res.status(200).json({ message: "Offers updated", offerIds: newOfferIds });
    } catch (err) {
        res.status(500).json({ message: "Error updating offers", error: err.message });
    }
};

module.exports = { createOffer, updateOffer };
