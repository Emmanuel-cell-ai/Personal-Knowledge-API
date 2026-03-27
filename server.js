require('dotenv').config();

const notesRoutes = require('./routes/notesRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
const express = require('express');
const connectDB = require('./config/db.config');
const cors = require('cors');
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Debug middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use('/api', notesRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);


app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
