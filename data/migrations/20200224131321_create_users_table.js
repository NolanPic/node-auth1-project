
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('username', 56)
            .unique()
            .notNullable();
        tbl.string('password', 1024)
            .notNullable();    
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
