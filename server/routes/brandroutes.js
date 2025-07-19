const express =  require('express');
const router = express.Router();
const upload = require('../middleware/uploads');
const BrandController = require('../controllers/brandcontroller');

//brands routes
router.post('/addbrand', upload.single('image'), BrandController.create);
router.get('/getbrand/:id', BrandController.findBrands);
router.get('/allbrands', BrandController.findBrands);
router.post('/addMultiplebrands', BrandController.addMultipleBrands);
router.put('/updatebrand/:id', BrandController.update);
router.delete('/deletebrand/:id', BrandController.deleteBrand);

module.exports = router;