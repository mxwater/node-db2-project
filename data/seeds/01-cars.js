exports.seed = function(knex) {
    return knex('cars').truncate() 
      .then(function() {
        return knex('cars').insert([
          { vin: '1HGCM82633A123456', make: 'Honda', model: 'Accord', mileage: 150000, title: 'clean', transmission: 'automatic' },
          { vin: '1G1BE5SM9H7289862', make: 'Chevrolet', model: 'Cruze', mileage: 120000, title: 'clean', transmission: 'manual' },
          { vin: '5YJSA1E26HF123456', make: 'Tesla', model: 'Model S', mileage: 50000, title: 'salvage', transmission: 'automatic' },
        ]);
      });
  };
  