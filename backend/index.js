require("dotenv").config({ path: "./backend/.env" });

const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const cors = require("cors");

const app = express();
const port = 5000;

// cors(cross origin resource sharing) allows frontend and backend to talk.
app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// this app starts a server and will listen on port 5000
app.listen(port, () => {
  console.log(`Note_Stack backend listening on port http://localhost:${port}`);
});