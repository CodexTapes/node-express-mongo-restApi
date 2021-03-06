require('dotenv').config();
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to mongo database'))

const carRouter = require('./routes/router');
app.use('/api', carRouter)

app.listen(port, () => {
    console.log(`running on ${port}`);
})
