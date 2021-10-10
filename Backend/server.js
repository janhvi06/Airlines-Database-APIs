const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()

const db = require('./database/db');

const app = express();

app.use(cors());
app.use(express.json());

const indexRoutes = require('./Routes/index.route');
app.use('/api', indexRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Listening at http://localhost:${process.env.PORT}`)
})