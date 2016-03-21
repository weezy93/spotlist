
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('facebook_id');
    table.string('first_name');
    table.string('last_name');
    table.text('email');
    table.string('city');
    table.string('state');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
