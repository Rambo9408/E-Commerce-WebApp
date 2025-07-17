const express =  require('express');
const router = express.Router();
const UserController = require('../controllers/usercontroller');
const CategoryController = require('../controllers/categorycontroller')
const ProductController = require('../controllers/usercontroller');
const OrderController = require('../controllers/usercontroller');

//employees routes
router.get('/Employees', UserController.find);
router.get('/Employee/:id', UserController.find);
router.post('/addEmployee', UserController.create);
router.post('/addMultipleEmployees', UserController.addMultipleEmployees);
router.put('/updateEmployee/:id', UserController.update);
router.delete('/deleteEmployee/:id', UserController.deleteEmployee);

//category routes
router.get('/', CategoryController.findCategory);
router.get('/:id', CategoryController.findCategory);
router.post('/addCategory', CategoryController.createCategory);
router.post('/addMultipleCatrgory', CategoryController.addMultipleCategories);
router.put('/updateCategory/:id', CategoryController.updateCategory);
router.delete('/daleteCategory/:id', CategoryController.deleteCategory);

module.exports = router;