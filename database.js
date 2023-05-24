/*
 * Database
 * 
 * By default a knex database adapter is provided. You can find documentation on it
 * here: http://knexjs.org as well as a cheatsheet here: https://devhints.io/knex
 * 
 * Feel free to use whatever tool you would like to access data. Connection details
 * can be found in the .env file
 * 
 * At it's most basic you could run: `knex.raw('SELECT ...', var1, var2)` for raw queries
 * or use the query builder to do something like `knex('sessions').where('thing1', '=', var1)`
 */

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        typeCast: function(field, next) {
            if (field.type == 'TINY' && field.length == 1) {
                return (field.string() == '1')
            }
            return next()
        }
    }
})

module.exports = knex