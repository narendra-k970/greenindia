const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');
const qrRoutes = require('./routes/qrRoutes');
const userRoutes = require('./routes/userRoutes');

require("dotenv").config();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// database connection
require("./config/db");

//routes
app.use('/api', formRoutes);
app.use('/api', qrRoutes);
app.use('/api/users', userRoutes);

// Serve uploaded files
// app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
