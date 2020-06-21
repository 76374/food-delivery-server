import express = require('express');
import mongoose = require('mongoose');
import cors = require('cors');

import graphqlHandler from './graphql/handler';
import connect from './mongoose/connect';

const app = express();

app.use(cors());

app.use('/graphql', graphqlHandler);

connect()
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
