const express = require('express');
const db = require('../helper/databaseconnection');
const fileupload = require('../helper/fileupload');
var ip = require("ip");
const equipmentRouter = express.Router();

var bankname = "select distinct (Bank_Name) from tbl_bankinfo";

equipmentRouter.get("/get", function (req, res) {

  var bankbranch = "select distinct (Bank_Branch) from tbl_bankinfo where Bank_Name = \"" + req.query.bankname + "\"";

  db.query(bankbranch, function (err, result, fields) {
    if (err) throw err;
    let output = JSON.stringify(result)

    return res.status(200).send(output);
  })
})
equipmentRouter.get("/", function (req, res) {
  //console.log(req.query.bankname)
  db.query(bankname, function queryresult(err, result) {
    if (err) throw err;
    return res.render("installedequipment", {
      label: "Bank Name",
      Banks: result
    });
  });
});

/*psot action handling*/
equipmentRouter.post(
  "/",fileupload.single('files'),(req, res, next) => {
    let equipDetails = req.body.installedequip;
    if (typeof(equipDetails) == 'string'){
      //equipDetails = JSON.parse(equipDetails);
      //console.log(JSON.parse(equipDetails))
      equipDetails = JSON.parse(equipDetails);
    }
    console.log (equipDetails)
    if (equipDetails.installedequip == "SM") {
      let BankName = equipDetails.BankName;
      let BankBranch = equipDetails.BranchName;
      let smname = equipDetails.smname;
      let smip = equipDetails.smip;
      let smserial = equipDetails.smserial;
      let smmacaddr = equipDetails.smmacaddr;
      let status = equipDetails.status;
      let swversion = equipDetails.swversion;
      let civil = equipDetails.civil;
      let note = equipDetails.note;
      //console.log (BankName+BankBranch+smname)
      var sql = "CALL sp_insertintosminfo(?)";
      var values = [
        smname,
        smip,
        status,
        swversion,
        note,
        smserial,
        smmacaddr,
        civil,
        BankName,
        BankBranch,
      ];
      db.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
    }
    else if (equipDetails.installedequip == "PTP")
    {
      let BankName = equipDetails.BankName;
      let BankBranch = equipDetails.BranchName;
      let ptpname = equipDetails.ptpname;
      let ptpip = equipDetails.ptpip;
      let ptpserial = equipDetails.ptpserial;
      let ptpmacaddr = equipDetails.ptpmacaddr;
      let status = equipDetails.status;
      let ptpfreq = equipDetails.ptpfreq;
      let ptpbw = equipDetails.ptpbw;
      let ptpazmith = equipDetails.ptpazmith;
      let swversion = equipDetails.swversion;
      let civil = equipDetails.civil;
      let note = equipDetails.note;
      //console.log (BankName+BankBranch+smname)
      var sql = "CALL sp_insertintoptpinfo(?)";
      var values = [
        ptpname,
        ptpip,
        status,
        swversion,
        note,
        ptpserial,
        ptpmacaddr,
        civil,
        ptpfreq,
        ptpbw,
        ptpazmith,
        BankName,
        BankBranch,
      ];
      db.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
    }
    else if (equipDetails.installedequip == "AP")
    {
      let BankName = equipDetails.BankName;
      let BankBranch = equipDetails.BranchName;
      let apname = equipDetails.apname;
      let apip = equipDetails.apip;
      let apserial = equipDetails.apserial;
      let apmacaddr = equipDetails.apmacaddr;
      let status = equipDetails.status;
      let apfreq = equipDetails.apfreq;
      let apbw = equipDetails.apbw;
      let apazmith = equipDetails.apazmith;
      let swversion = equipDetails.swversion;
      let civil = equipDetails.civil;
      let note = equipDetails.note;
      //console.log (BankName+BankBranch+smname)
      var sql = "CALL sp_insertintoapinfo(?)";
      var values = [
        apname,
        apip,
        status,
        swversion,
        note,
        apserial,
        apmacaddr,
        civil,
        apfreq,
        apbw,
        apazmith,
        BankName,
        BankBranch,
      ];
      db.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
    }
    else if (equipDetails.installedequip == "SW")
    {
      console.log("start")
      //console.log(result);*/
      console.log(req.file)
      let file = req.file
      //console.log(equipDetails)
      if (!file) {
        const error = new Error('Please upload a file')
        return next(error)
      }
      //res.send(file)
      let serverip = ip.address()
      let configfile =`http://${serverip}:3000/files/switch/${req.file.filename}`;
      console.log(configfile);
      let BankName = equipDetails.BankName;
      let BankBranch = equipDetails.BranchName;
      let swname = equipDetails.swname;
      let swip = equipDetails.swip;
      let swserial = equipDetails.swserial;
      let status = equipDetails.status;
      let swversion = equipDetails.swversion;
      let civil = equipDetails.civil;
      let note = equipDetails.note;
      //console.log (BankName+BankBranch+smname)
      var sql = "CALL sp_insertintoswitchinfo(?)";
      var values = [
        swname,
        swip,
        status,
        swversion,
        note,
        swserial,
        civil,
        configfile,
        BankName,
        BankBranch,
      ];
      db.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
    }
    else if (equipDetails.installedequip == "camera")
    {
      let BankName = equipDetails.BankName;
      let BankBranch = equipDetails.BranchName;
      let camname = equipDetails.camname;
      let camip = equipDetails.camip;
      let camserial = equipDetails.camserial;
      let status = equipDetails.status;
      let note = equipDetails.note;
      //console.log (BankName+BankBranch+smname)
      var sql = "CALL sp_insertintocamerainfo(?)";
      var values = [
        camname,
        camip,
        status,
        note,
        camserial,
        BankName,
        BankBranch,
      ];
      db.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
    }
  }
)
//handle file upload 
/*equipmentRouter.post('/filesupload', fileupload.single('files'), (req, res, next) => {
  let file = req.file
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
  //imageinsert.dbinsert(result);})*/
module.exports = equipmentRouter;