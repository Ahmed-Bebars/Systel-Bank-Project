const express = require('express');
//define modules which used for image upload
const fileupload = require('../helper/fileupload');
const fileinsert = require('../helper/databaseconnection');
const filesupload = express.Router();


//define post route function
filesupload.post('/filesupload', fileupload.single('files'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  console.log(file);
  //res.send(file);
  res.json({
    profile_url: `http://localhost:3000/files/${req.file.filename}`
  })
  var result = {
    profile_url: `http://localhost:3000/files/${req.file.filename}`
  };
  console.log(result);
  //define function will insert url in db
  //imageinsert.dbinsert(result);
})

module.exports = filesupload;