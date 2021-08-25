const express = require('express');
const db = require('../helper/databaseconnection');
const reportRouter = express.Router();


reportRouter.get("/", function (req, res) {
  return res.render("report.ejs")
})

reportRouter.get("/get", function (req, res) {
  console.log(req.query.reportname)
  requiredreport = req.query.reportname
  if (requiredreport == "statusreport") {
    var report = "select * from bankproject.vw_statusreport";

    db.query(report, function (err, result, fields) {
      if (err) throw err;
      let output = JSON.stringify(result)

      return res.status(200).send(output);
    })

  }
  else if (requiredreport == "smdata") {
    var report = "select * from bankproject.vw_smdata";

    db.query(report, function (err, result, fields) {
      if (err) throw err;
      let output = JSON.stringify(result)

      return res.status(200).send(output);
    })

  }
  else if (requiredreport == "bankdata") {
    var report = "select * from bankproject.vw_bankdata";

    db.query(report, function (err, result, fields) {
      if (err) throw err;
      let output = JSON.stringify(result)

      return res.status(200).send(output);
    })

  }
})

reportRouter.get("/update", function (req, res) {
  //console.log(req)
  console.log(req.query.updatereportname)
  requiredreport = req.query.updatereportname;
  var selectedcol = Object.keys(req.query)[1];
  //console.log(Object.keys(req.query)[1])
  let requiredcol = req.query
  let array = [];
  for (let [key, value] of Object.entries(requiredcol)) {
    array.push(value)
  }
  if (array.length > 2){
  for (let i = 2; i < array.length; i++) {
    selectedcol = selectedcol +',' + array[i];
  }
  console.log(selectedcol)
  if (requiredreport == "statusreport") {
    var report = "select "+selectedcol+" from bankproject.vw_statusreport";
    db.query(report, function (err, result, fields) {
      if (err) throw err;
      console.log(result)
      let output = JSON.stringify(result)
      return res.status(200).send(output);
    })

  }
  else if (requiredreport == "smdata") {
    var report = "select "+selectedcol+" from bankproject.vw_smdata";
    db.query(report, function (err, result, fields) {
      if (err) throw err;
      console.log(result)
      let output = JSON.stringify(result)
      return res.status(200).send(output);
    })

  }
  else if (requiredreport == "bankdata") {
    var report = "select "+selectedcol+" from bankproject.vw_bankdata";
    db.query(report, function (err, result, fields) {
      if (err) throw err;
      console.log(result)
      let output = JSON.stringify(result)
      return res.status(200).send(output);
    })
  }
}
})

module.exports = reportRouter;