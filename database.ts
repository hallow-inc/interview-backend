/*
 * Database
 *
 * By default a knex database adapter is provided. You can find documentation on it
 * here: http://knexjs.org as well as a cheatsheet here: https://devhints.io/knex
 *
 * Feel free to use whatever tool you would like to access data. Connection details
 * can be found in the .env file
 *
 * `database` is an instance of Knex, where you see `knex.` in the docs you can use `database.`
 * At it's most basic you could run: `database.raw('SELECT ...', var1, var2)` for raw queries
 * or use the query builder to do something like `database('sessions').where('thing1', '=', var1)`
 */

import knex, { Knex } from 'knex'

function connectDB(): Knex {
    return knex({
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: Number(process.env.DB_PORT),
            typeCast: function (field: any, next: () => any) {
                if (field.type == 'TINY' && field.length == 1) {
                    return field.string() == '1'
                }
                return next()
            },
        } as Knex.MySql2ConnectionConfig,
    })
}

export default connectDB
