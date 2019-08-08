const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/wiki', wikiRouter);

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

models.db.authenticate().then(() => {
  console.log('connected to the database');
});

const init = async () => {
  try {
    await models.db.sync({ force: true });
    //await models.User.sync();
    //await models.Page.sync();
    //console.log('hello');
  } catch (err) {
    console.error(err);
  }

  const port = 1337;
  app.listen(port, () => {
    console.log(`App listening in port ${port}`);
  });
};

init();
