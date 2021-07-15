exports.up = function(knex) {
  return knex.schema.createTable('auctions', function(table){
    
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.boolean('is_new').notNullable();

    table.string('initial_value').notNullable();
    table.string('winner_value');

    table.string('owner_user_id').notNullable();
    table.string('winner_user_id');

    table.string('initial_date').notNullable();
    table.string('final_date').notNullable();

    table.foreign('owner_user_id').references('id').inTable('users');
    table.foreign('winner_user_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('auctions');
};
