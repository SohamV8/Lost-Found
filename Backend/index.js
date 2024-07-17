const express = require('express');
const cors = require('cors');
const connectDB = require('./connection');
require('dotenv').config();
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use(bodyParser.json());

// //Set up routes
// const reportRoute = require('./routes/reportRoute');
// app.use('/api', reportRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
