const express = require('express');
const router = express.Router();
const Cars = require('./cars-model');
const { checkCarPayload, checkVinNumberValid, checkVinNumberUnique, checkCarId } = require('./cars-middleware');

router.get('/', async (req, res) => {
  try {
    const cars = await Cars.getAll();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get cars' });
  }
});

router.get('/:id', checkCarId, (req, res) => {
  res.json(req.car);
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res) => {
  try {
    const newCar = await Cars.create(req.body);
    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new car' });
  }
});

router.put('/:id', checkCarId, checkCarPayload, checkVinNumberValid, async (req, res) => {
  try {
    const updatedCar = await Cars.update(req.params.id, req.body);
    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update car' });
  }
});

router.delete('/:id', checkCarId, async (req, res) => {
  try {
    await Cars.remove(req.params.id);
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete car' });
  }
});

module.exports = router;
