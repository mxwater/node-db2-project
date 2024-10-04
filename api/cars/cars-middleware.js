const Cars = require('./cars-model');

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;

  if (!vin) {
    return res.status(400).json({ message: 'vin is missing' });
  }
  if (!make) {
    return res.status(400).json({ message: 'make is missing' });
  }
  if (!model) {
    return res.status(400).json({ message: 'model is missing' });
  }
  if (mileage === undefined || typeof mileage !== 'number') {
    return res.status(400).json({ message: 'mileage is missing' });
  }

  next();
};

function checkVinNumberValid(req, res, next) {
  const vin = req.body.vin;
  
  if (!vin || vin.length !== 17) {  
    return res.status(400).json({ message: `vin ${vin} is invalid` });
  }

  next();  
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;

  try {
    const existingCar = await Cars.getByVin(vin);
    if (existingCar) {
      return res.status(400).json({ message: `vin ${vin} already exists` });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Error checking VIN uniqueness' });
  }
};

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    if (car) {
      req.car = car;
      next();
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error checking car ID' });
  }
};

module.exports = {
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  checkCarId,
};
