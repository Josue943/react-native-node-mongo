const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(config.get('mongoURI'), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
