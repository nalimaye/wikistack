const router = require('express').Router();
const addPage = require('../views/addPage');
const main = require('../views/main');
const { Page } = require('../models');
//const { addPage } = require("../views");

router.get('/', (req, res, next) => {
  console.log('retrieving wiki pages');
  res.send(main());
});

router.post('/', async (req, res, next) => {
  console.log('submitting new page to db');

  const page = new Page({
    title: `${req.body.title}`,
    content: `${req.body.content}`,
  });

  try {
    await page.save();
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

router.get('/add', (req, res, next) => {
  console.log('retrieving add-a-page form');
  res.send(addPage());
});

module.exports = router;
