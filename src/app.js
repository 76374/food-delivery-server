const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const menuRouter = require('./routes/menu');
const { DB } = require('./consts/path');
const graphqlHandler = require('./graphql/handler');

const app = express();

app.use(cors());

app.use('/graphql', graphqlHandler);

app.use(menuRouter);

mongoose
  .connect(DB, {useNewUrlParser: true, useUnifiedTopology: true} )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
