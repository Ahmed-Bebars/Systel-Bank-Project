const express = require('express');
const db=require('../helper/databaseconnection');
const auth = require ('../model/user')
const indexRouter = express.Router();

indexRouter.get("/", function (req, res) {
      return res.render("index")
  });

  module.exports = indexRouter;

  indexRouter.post('/auth',auth.auth);

module.exports = indexRouter;
