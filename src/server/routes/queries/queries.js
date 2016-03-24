var knex = require('../../../db/knex.js');;

function Users() {
  return knex('users');
}

function Spots() {
  return knex('spots');
}

function getSingleUser(id) {
  return Users().where('id', id);
}

// LOGIC FOR KNEX QUERIES

module.exports = {
  getSingleUser: getSingleUser,
};
