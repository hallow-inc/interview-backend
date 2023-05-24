/*
 * User Activity
 *
 * Create a function which parses a list of activity located in the "sessions"
 * table and provides an array that can be used by the client to display a given
 * user's activity with associated streaks. The array should contain every day
 * between the date the user is created through today with session activity intertwined.
 * 
 * Note: There will not be session activity for every day
 * 
 * Details:
 * - Each streak key is an integer representing a part of a streak UI: none, start,
 * middle, end. 
 *      Examples:
 *      - If a streak is only a single session, it should be "middle"
 *      - If a streak is four long it should be start, middle, middle, end
 *      - If it is two long, it would just be start, end
 * - is_today should only be true if the date is actually today
 * - has_session should only be true if that given day has a session
 * 
 * Relevant Schema:
 * sessions
 * - id: int
 * - user_id: int
 * - prayer_id: int
 * - is_complete: boolean
 * - created_at: timestamp
 */

const STREAK_NONE = 0
const STREAK_START = 1
const STREAK_MIDDLE = 2
const STREAK_END = 3

module.exports = async function activity(database, userId) {

    // Output: An array of activity
    // [
    //     {
    //       "has_session": false,
    //       "is_today": false,
    //       "streak": 0,
    //       "date": "2021-05-01T12:00:00.000Z"
    //     },
    //     {
    //       "has_session": false,
    //       "is_today": true,
    //       "streak": 1,
    //       "date": "2021-05-13T12:00:00.000Z"
    //     },
    //     ...
    // ]
}