require("dotenv").config();

const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// this app starts a server and will listen on port 3000
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});