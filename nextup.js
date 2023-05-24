/*
 * Next Up
 *
 * Implement the following logic below to create a function which returns the next
 * prayer a user should play. As inputs it should take a user's past sessions into
 * consideration as well as their category preferences.
 * 
 * Logic:
 * - Take the user's last completed prayer and see if there is a prayer that comes after it
 * in the parent collection using its order key. If there is one, return it
 * - If there are no remaining prayers, find a new collection for the user and return
 * the first uncompleted prayer in that collection
 * - To find a new collection, follow the following logic:
 *      - Each collection has a "category" key, and each user has a list of categories
 *      they are interested in under "categories". Only pick from collections where there
 *      is a match.
 *      - Randomly shuffle the collections
 *      - Select the first collection from that list
 * - If a user has no more collections left that they are interested in, randomly pick
 * a collection and prayer
 * 
 * 
 * Relevant schema:
 * users
 * - id: int
 * - name: varchar
 * - categories: json (may need to be parsed from string)
 * - timezone: varchar
 * - created_at: timestamp
 * 
 * sessions
 * - id: int
 * - user_id: int
 * - prayer_id: int
 * - is_complete: boolean
 * - created_at: timestamp
 * 
 * collections
 * - id: int
 * - category: int
 * - title: varchar
 * 
 * prayers
 * - id: int
 * - collection_id: int
 * - title: varchar
 * - order: int
 */

// Categories:
const SLEEP = 1
const CHALLENGE = 2
const DAILY = 3

module.exports = async function nextup(database, userId) {

    // Output: A single prayer
    // {
    //     "id": 10,
    //     "collection_id": 2,
    //     "title": "Opening the door to God",
    //     "order": 1
    // }
}