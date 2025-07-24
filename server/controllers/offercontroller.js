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
      description,
      productID: [productId]
    });

    await offer.save();

    await Product.findByIdAndUpdate(productId, {
      $addToSet: { offerId: offer._id }  // ensure no duplicate links
    });

    res.status(201).json({
      message: "Offer created and linked to product",
      offerId: offer._id
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating offer", error: err.message });
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

const deleteOffer = async (req, res) => {
    try {
        const offerId = req.params.id;
        const { productId } = req.body;

        if (!offerId || !productId) {
            return res.status(400).json({ error: 'Missing offerId or productId' });
        }

        // Step 1: Delete the offer
        const deletedOffer = await Offers.findByIdAndDelete(offerId);
        if (!deletedOffer) {
            return res.status(404).json({ error: 'Offer not found' });
        }

        // Step 2: Remove the offerId from the product's offerId array
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $pull: { offerId: offerId } },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({
            message: 'Offer deleted and removed from product successfully',
            deletedOffer,
            updatedProduct
        });
    } catch (err) {
        console.error('Error deleting offer:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { createOffer, updateOffer, deleteOffer };
