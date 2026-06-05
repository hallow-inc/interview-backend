import database from './database'
import activity from './activity'
import nextup from './nextup'
import { activityResultSchema, nextUpResultSchema } from './types'

/*
 * Instructions
 *
 * Follow the prompts in the "activity" and the "nextup" files
 *
 * Database details can be found in the "database" file
 *
 * To get everything installed & set up run "npm run setup"
 *
 * Once the functions are completed you can run them using "npm start"
 *
 * The `*Schema` validators from "types" let you assert that your output matches
 * the expected shape at runtime — `parse` throws on a mismatch.
 */

const db = database()

activity(db, 1)
    .then((results) => {
        activityResultSchema.parse(results)
        console.log('activity results:')
        console.table(results)
        return nextup(db, 2)
    })
    .then((result) => {
        if (result !== undefined) {
            nextUpResultSchema.parse(result)
        }
        console.log('next up results:')
        console.table(result)
    })
    .catch(console.error)
    .finally(() => db.destroy())
