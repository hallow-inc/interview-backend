const database = require('./database')
const activity = require('./activity')
const nextup = require('./nextup')

/*
 * Instructions
 * 
 * Follow the prompts in the "activity" and the "nextup" files
 * 
 * Database details can be found in the "database" file
 * 
 * To get everything installed run "npm install"
 * 
 * Once the functions are completed you can run them using "npm start"
 */

activity(database, 1)
.then((results) => {
    console.log('activity results:', results)
    return nextup(database, 2)
})
.then((result) => {
    console.log('next up result:', result)
})
.catch(console.error)