import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes/index.js';
import databaseConnection from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', routes);

const db = databaseConnection;
db.mongoose
    .connect(db.url, {})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to DB and running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log('Could not connect to the DB!', err);
        process.exit();
    });
