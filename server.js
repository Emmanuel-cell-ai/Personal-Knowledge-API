require('dotenv').config();

const notesRoutes = require('./routes/notesRoutes');
const express = require('express');
const connectDB = require('./config/db.config');
const app = express();

connectDB();

app.use(express.json());

app.use('/api', notesRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port https://localhost:${process.env.PORT}`);
});
