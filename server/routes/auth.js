const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usercontroller');
const AuthController = require('../controllers/authcontroller');

//employees routes
router.get('/Employees', UserController.find);
router.get('/Employee/:id', UserController.find);
router.post('/addEmployee', UserController.create);
router.post('/login', AuthController.login);
router.put('/updateEmployee/:id', UserController.update);
router.post('/addMultipleEmployees', UserController.addMultipleEmployees);// only used to add employees through api
router.delete('/deleteEmployee/:id', UserController.deleteEmployee);
router.get('/loggedinUser', AuthController.getCurrentEmployee);

module.exports = router;