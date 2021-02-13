const mongoose = require('mongoose')
const express = require('express')
const app = express();
const routes = require('./routes/routes.js')

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(express.json())

app.use('/api/v1/cars', routes)

app.listen(3000)