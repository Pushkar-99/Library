const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./Config/config');
const router = express.Router();

const app = express();


//1. mongodb connection using promise function
//2. Server started after mongodb connection
mongoose.connect(config.database, { useNewUrlParser: true , useUnifiedTopology: true })
.then(() => {
  console.log('Connected to Database');
  const server = app.listen(3002, (err) =>
 {
  if(err)
   console.log(err);

  console.log(`Server started at 3002`);
})
})
.catch((err) => {
  console.log('Database Error:' +err);
}); 




//Bring the services
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//Morgan middleware logging each http request in console
app.use(morgan('dev'));




//Bringing in the Routes
const postsroute = require('./routes/postsroute');




//Using the routes
app.use('/postsroute', postsroute);