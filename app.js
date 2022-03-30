const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

// initialize app

const app = express();

// Middlewares

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(passport.initialize());
// Bring in the Passport Strategy
require('./config/passport')(passport);

app.use(bodyParser.json());

app.use(cors());

// setting static directory

app.use(express.static(path.join(__dirname, "public")));

// Bring DB config
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Database is Connected `);
  })
  .catch((err) => console.log("database not connected !!!!"));

//------------------------------------------------------------------//

// User Routes

const users= require('./routes/api/users');
app.use('/api/users',users);

//sites Routes

const sites= require('./routes/api/sites');
app.use('/api/sites',sites);
//Questions Routes

const questions= require('./routes/api/questions');
app.use('/api/question',questions);

// server connection 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is started on port : ${PORT}`);
});
