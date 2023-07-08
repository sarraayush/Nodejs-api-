const express = require('express');

const morgan = require('morgan');

const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const productRoutes = require("./api/routes/products");

const orderRoutes = require('./api/routes/orders');

// mongoose.connect('mongodb://localhost:27017', {
//     // useMongoClient : true  old one 
//     useNewUrlParser : true 
// });
async function connectToDatabase() {
    try {
      // Replace 'mongodb+srv://<username>:<password>@<cluster-url>/<database-name>' with your MongoDB connection string
      await mongoose.connect('mongodb+srv://user1:Aayush%40%2A1@sandbox.aycicub.mongodb.net/api_database?ssl=true&replicaSet=atlas-be4a8a-shard-0', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  connectToDatabase();  

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());


//Handling cors here 

app.use((req, res, next) => {
     
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Acess-Control-Allow-Headers" , "Origin , X-Requested-With , Accept , Authorization");
      if(req.method === 'OPTIONS')
      {
        res.header("Access-Control-Allow-Methords", "PUT , POST, OPTIONS, PATCH ,  DELETE");
      }
});

app.use('/products', productRoutes);

app.use('/orders', orderRoutes);

app.use((req, res, next) => {

    const error = new Error("Not Found!");
    error.status = 404;
    next(error);

});

app.use((error , req, res, next)=>{

    res.status(error.status || 500);

    res.json({
        error : {
            message : error.message
        }
    });

});

module.exports = app;