const router = require('express').Router();
// Controllers
const controller = require('../controllers/controller.js')
// Endpoints
router.post('/add', controller.addCar)
router.get('/get', controller.getCar)
router.delete('/delete', controller.deleteCar)
router.patch('/update', controller.updateCar)
router.get('/filter', controller.filterCars)

module.exports = router;