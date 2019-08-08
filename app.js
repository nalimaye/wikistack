const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const models = require('./models');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.send('hello world');
});

// db.authenticate().then(() => {
//   console.log('connected to the database');
// });

const init = async () => {
  await models.User.sync();
  await models.Page.sync();

  const port = 1337;
  app.listen(port, () => {
    console.log(`App listening in port ${port}`);
  });
};

init();
