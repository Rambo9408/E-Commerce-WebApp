const express =  require('express');
const router = express.Router();
const ProductController = require('../controllers/productcontroller');
const upload = require('../middleware/uploads');

//category routes
router.get('/', ProductController.find);
router.get('/:id', ProductController.find);
router.post('/addProducts',upload.fields([{ name: 'images', maxCount: 10 }]), ProductController.addProduct);
router.post('/addMultipleProducts', ProductController.addMultipleProducts);
router.put('/updateProduct/:id', ProductController.updateProduct);
router.delete('/deleteProduct/:id', ProductController.deleteProduct);

module.exports = router;