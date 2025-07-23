const Offers = require('../models/offers');
const Product = require('../models/product');

const createOffer = async (req, res) => {
    try {
        console.log(req.body);

        const { description, productId } = req.body;

        if (!description || !productId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const offer = new Offers({
            description: description,
            productID: [productId]
        });
        await offer.save();
        // const createdOffers = [];

        // for (const desc of offers) {
        //     const offer = new Offers({
        //         description: desc,
        //         productID: [productId]
        //     });
        //     await offer.save();
        //     createdOffers.push(offer._id); // store only the _id
        // }

        // await Product.findByIdAndUpdate(productId, {
        //     $addToSet: { offerId: { $each: createdOffers } } // avoid duplicates
        // });

        await Product.findByIdAndUpdate(productId, {
            $addToSet: { offerId: offer._id } 
        });

        res.status(201).json({ message: "Offers created and linked to product", offerIds: createdOffers });
    } catch (err) {
        res.status(500).json({ message: "Error creating offers", error: err.message });
    }
};

const updateOffer = async (req, res) => {
    try {
        // const productId = req.params.id;
        const { offerId, description } = req.body;

        if (!offerId || !description) {
            return res.status(400).json({ message: "Invalid offers format" });
        }

        // Step 1: Find all existing offer IDs for the product
        const oldOffers = await Offers.find({ _id: offerId });

        // Step 2: Remove product reference from those offers and delete them
        // const oldOfferIds = oldOffers.map(o => o._id);

        // await Offers.deleteMany({ _id: { $in: oldOfferIds } });
        await Offers.deleteOne({ _id: oldOffers._id });

        // // Step 3: Remove offer references from Product
        const updatedOffer = await Offers.findByIdAndUpdate(
            offerId,
            { description },
            { new: true }
        );

        // await Product.findByIdAndUpdate(productId, { $pull: { offerId: { $in: oldOfferIds } } });

        // // Step 4: Create new offers
        // const newOfferIds = [];

        // for (const desc of offers) {
        //     const newOffer = new Offers({
        //         description: desc,
        //         productID: [productId]
        //     });
        //     await newOffer.save();
        //     newOfferIds.push(newOffer._id);
        // }

        // // Step 5: Update product with new offers
        // await Product.findByIdAndUpdate(productId, {
        //     $set: { offerId: newOfferIds }
        // });

        res.status(200).json({ message: "Offers updated", offer: updatedOffer });
    } catch (err) {
        res.status(500).json({ message: "Error updating offers", error: err.message });
    }
};

module.exports = { createOffer, updateOffer };
