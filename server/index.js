const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const app = express();

app.use(bodyParser.json())
app.use(cors())

const secret = require('./routes/api/secret')
app.use('/api/secret', secret)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});