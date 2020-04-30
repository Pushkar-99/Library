const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./Config/config');
const router = express.Router();



//Application variable
const PORT = 3002;
const app = express();
const server = app.listen(PORT, (err) =>
 {
  if(err)
   console.log(err);

  console.log(`Server started at ${PORT}`);
});



//MongoDb COnnection
mongoose.connect(config.database, { useNewUrlParser: true , useUnifiedTopology: true });
//Checking the connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database');
});
mongoose.connection.on('error', (err) => {
  console.log('Database Error:' +err);
});




//Bring the services
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));




//Bringing in the Routes
const postsroute = require('./routes/postsroute');





//Using the routes
//app.use('/',express.static('uploads'));
app.use('/postsroute', postsroute);



