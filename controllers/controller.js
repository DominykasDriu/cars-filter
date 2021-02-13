// Import schema /w model
const Car = require('../modules/model.js')
// Add new car
addCar = async (req, res) => {
  let newCar = new Car({
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    rida: req.body.rida,
    shift: req.body.shift
  })
  try {
    let savedCar = await newCar.save()
    res.json(savedCar)
  } catch (e) {
    res.status(400).json(e.message)
  }
}
// Get Car by ID
getCar = (req, res) => {
  Car.findById(req.body.id, (err, item) => {
    if (err) return res.status(404).json({message: 'Incorrect ID passed!'});
    res.json(item)
  })
}
// Delete car
deleteCar = async (req, res) => {
  try {
    let deletedCar = await Car.deleteOne({_id: req.body.id})
    deletedCar.deletedCount ? res.json({message: 'Car deleted!'}) : res.json({message: 'Car already deleted!'})
  } catch {
    res.status(400).json({message: 'Car not found!'})
  }
}
// Update car
updateCar = async (req, res) => {
  try {
    let updatedCar = await Car.findByIdAndUpdate(req.body.id, req.body, {new: true})
    res.json({
      message: 'Updated succesfully!',
      updatedCar: updatedCar
    })
  } catch {
    res.status(400).json({message: 'Somethings wrong!'})
  }
}
// Car filter
filterCars = async (req, res) => {
  try {
    let allCars = await Car.find({})
    // Filter by Rida
    if (req.body.ridaGreaterThan) allCars = allCars.filter(e => e.rida >= req.body.ridaGreaterThan)
    if (req.body.ridaLessThan) allCars = allCars.filter(e => e.rida <= req.body.ridaLessThan)
    // Filter by year
    if (req.body.yearGreaterThan) allCars = allCars.filter(e => e.year >= req.body.yearGreaterThan)
    if (req.body.yearLessThan) allCars = allCars.filter(e => e.year <= req.body.yearLessThan)
    // Filter by shift type
    if (req.body.shiftType) allCars = allCars.filter(e => e.shift.toUpperCase() === req.body.shiftType.toUpperCase())
    // Sort if there is sort property passed
    if (req.body.sort && allCars.length !== 0) {
      switch (req.body.sort.toUpperCase()) {
        case 'YEAR':
          allcars = allCars.sort((a,b) => b.year - a.year)
          break;
          case 'MODEL':
            allCars = allCars.sort((a,b) => (a.model < b.model) ? 1 : -1)
            break;
            case 'RIDA':
              allcars = allCars.sort((a,b) => a.year - b.year)
              break;
      }
      return res.json(allCars)
    // If there is no sort method return filtered cars
    } else if (allCars.length !== 0) {
      res.json(allCars)
    // If filtered cars array is empty
    } else {
      res.json({message: 'No cars found with this filter!'})
    }
  } catch (e) {
    res.status(400).json(e.message)
  }
}

module.exports = {
  addCar,
  getCar,
  deleteCar,
  updateCar,
  filterCars
}