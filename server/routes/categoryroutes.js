const express =  require('express');
const router = express.Router();
const CategoryController = require('../controllers/categorycontroller');

//category routes
router.get('/', CategoryController.findCategory);
router.get('/:id', CategoryController.findCategory);
router.post('/addCategory', CategoryController.createCategory);
router.post('/addMultipleCatrgory', CategoryController.addMultipleCategories);
router.put('/updateCategory/:id', CategoryController.updateCategory);
router.delete('/deleteCategory/:id', CategoryController.deleteCategory);

module.exports = router;