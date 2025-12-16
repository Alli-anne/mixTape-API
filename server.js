import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import databaseConnection from './models/index.js';
import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json());

// Session support
app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret-key",
        resave: false,
        saveUninitialized: false,
    })
);

// Load main routes
app.use('/', routes);

// ✅ 404 Handler — fixes "no info" errors
app.use((req, res, next) => {
    res.status(404).json({
        error: true,
        message: `Route not found: ${req.originalUrl}`,
    });
});

// ✅ Central Error Handler — fixes "wrong error" responses
app.use((err, req, res, next) => {
    console.error(err.message || err);

    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Internal Server Error',
    });
});

// Database connection + server start
const db = databaseConnection;
db.mongoose
    .connect(db.url, {})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to DB and running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Could not connect to the DB!', err.message);
        process.exit(1);
    });