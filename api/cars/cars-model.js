const db = require('../../data/db-config'); 

const getAll = () => {
  return db('cars');
};


const getById = (id) => {
  return db('cars').where({ id }).first(); 
};

const create = async (car) => {
  const [id] = await db('cars').insert(car); 
  return getById(id);
};


const update = (id, changes) => {
  return db('cars').where({ id }).update(changes).then(() => getById(id));
};

const remove = (id) => {
  return db('cars').where({ id }).del();
};


module.exports = {
  getAll,
  getById,
  create,
};