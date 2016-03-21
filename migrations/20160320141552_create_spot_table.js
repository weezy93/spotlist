
exports.up = function (knex, Promise) {
  return knex.schema.createTable('spots', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('type');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('spots');
};
