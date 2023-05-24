# Interview

This repository contains two different challenges. Please review all files. Database access as well as which challenge you will be starting with will be provided at the start.

## User Activity
Create a function which parses a list of activity located in the "sessions"
table and provides an array that can be used by the client to display a given
user's activity with associated streaks. The array should contain every day
between the date the user is created through today with session activity intertwined.

Note: There will not be session activity for every day

### Details
- Each streak key is an integer representing a part of a streak UI: none, start,
middle, end. 
     Examples:
     - If a streak is only a single session, it should be "middle"
     - If a streak is four long it should be start, middle, middle, end
     - If it is two long, it would just be start, end
- is_today should only be true if the date is actually today
- has_session should only be true if that given day has a session

### Relevant Schema
```
sessions
- id: int
- user_id: int
- prayer_id: int
- is_complete: boolean
- created_at: timestamp
```

## Nextup

Implement the following logic below to create a function which returns the next
prayer a user should play. As inputs it should take a user's past sessions into
consideration as well as their category preferences.

### Logic
- Take the user's last completed prayer and see if there is a prayer that comes after it
in the parent collection using its order key. If there is one, return it
- If there are no remaining prayers, find a new collection for the user and return
the first uncompleted prayer in that collection
- To find a new collection, follow the following logic:
     - Each collection has a "category" key, and each user has a list of categories
     they are interested in under "categories". Only pick from collections where there
     is a match.
     - Randomly shuffle the collections
     - Select the first collection from that list
- If a user has no more collections left that they are interested in, randomly pick
a collection and prayer

### Relevant Schema
```
users
- id: int
- name: varchar
- categories: json (may need to be parsed from string)
- timezone: varchar
- created_at: timestamp

sessions
- id: int
- user_id: int
- prayer_id: int
- is_complete: boolean
- created_at: timestamp

collections
- id: int
- category: int
- title: varchar

prayers
- id: int
- collection_id: int
- title: varchar
- order: int
```
