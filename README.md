# Personal-Knowledge-API
## Project Overview
This is a RESTful API built using Node.js and Express that allows users to create,read,update and delete personal notes. It also supports advanced features such as search,  pagination and sorting.
## Features
- Create a new note
- Retrieve all notes
- Retrieve a single note by ID
- Update a note
- Delete a note
- Search notes by title or content
- Pagination (Page & limit)
- Sorting (by date)
## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
## API Endpoints
- Create a Note
  POST /api/notes
- Get All Notes
  GET /api/notes?page=1&limit=10
- Search Notes
  GET /api/notes?search=work
- Get Single Note
  GET /api/notes/:id
- Update Note
  PUT /api/notes/:id
- Delete Note
  DELETE /api/notes/:id
## Data Model
A note contains:
- title (String)
- content (String)
-	category (String)
-	tags (Array)
-	createdAt
-	updatedAt
## Challenges Faced
- MongoDB connection issues
- Debugging errors
- Time constraints
## LIVE URL
https://personal-knowledge-api-9ql0.onrender.com

## Contributors
- Salau Aisha Omowunmi
- Nwakpa Ejike Chukwuma
- Asiedu Emmanuel
  
