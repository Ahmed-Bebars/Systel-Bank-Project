const express = require('express');
const db = require('../helper/databaseconnection');
const equipmentRouter = express.Router();

var bankname = "select distinct (Bank_Name) from tbl_bankinfo";

equipmentRouter.get("/update", function (req, res) {

  var bankbranch = "select distinct (Bank_Branch) from tbl_bankinfo where Bank_Name = \"" + req.query.bankname + "\"";

  db.query(bankbranch, function (err, result, fields) {
    if (err) throw err;
    let output = JSON.stringify(result)

    return res.status(200).send(output);
  })
})

equipmentRouter.get("/equipmentname", function (req, res) {
  var equipment = "select distinct (Name) from vw_ptpinfo where Bank_Name = \"" + req.query.bankname + "\""+ " AND Bank_Branch = \"" + req.query.branchname + "\"";
  console.log(equipment)
  db.query(equipment, function (err, result, fields) {
    if (err) throw err;
    let output = JSON.stringify(result)
    console.log(output)
    return res.status(200).send(output);
  })
})

equipmentRouter.get("/update/equip", function (req, res) {
  if (req.query.equipmentname == 'SM'){

    var bankbranch = "select * from vw_sminfo where Bank_Name = \"" + req.query.bankname + "\"" + " AND Bank_Branch = \"" + req.query.branchname + "\"";

    db.query(bankbranch, function (err, result, fields) {
      if (err) throw err;
      let output = JSON.stringify(result)
  
      return res.status(200).send(output);
    })

  }
  else if (req.query.equipmentname == 'PTP'){

    var bankbranch = "select * from vw_ptpinfo where Bank_Name = \"" + req.query.bankname + "\""+ " AND Bank_Branch = \"" + req.query.branchname + "\"" + " AND Name = \"" + req.query.installedequipmentname + "\"";

    db.query(bankbranch, function (err, result, fields) {
      if (err) throw err;
      let output = JSON.stringify(result)
  
      return res.status(200).send(output);
    })

  }
  else if (req.query.equipmentname == 'AP'){

    var bankbranch = "select * from vw_apinfo where Bank_Name = \"" + req.query.bankname + "\""+ " AND Bank_Branch = \"" + req.query.branchname + "\"";
    console.log(bankbranch)
    db.query(bankbranch, function (err, result, fields) {
      if (err) throw err;
      let output = JSON.stringify(result)
      return res.status(200).send(output);
    })

  }
  else if (req.query.equipmentname == 'SW'){

    var bankbranch = "select * from vw_switchinfo where Bank_Name = \"" + req.query.bankname + "\""+ " AND Bank_Branch = \"" + req.query.branchname + "\"";

    db.query(bankbranch, function (err, result, fields) {
      if (err) throw err;
      let output = JSON.stringify(result)
  
      return res.status(200).send(output);
    })

  }
  else if (req.query.equipmentname == 'camera'){

    var bankbranch = "select * from vw_camerainfo where Bank_Name = \"" + req.query.bankname + "\""+ " AND Bank_Branch = \"" + req.query.branchname + "\"";

    db.query(bankbranch, function (err, result, fields) {
      if (err) throw err;
      let output = JSON.stringify(result)
  
      return res.status(200).send(output);
    })

  }
})

equipmentRouter.get("/", function (req, res) {
  console.log(req.query.bankname)

  db.query(bankname, function queryresult(err, result) {
    if (err) throw err;
    return res.render("updateinstalledequipment", {
      label: "Bank Name",
      Banks: result
    });
  });
});

/*psot action handling*/
equipmentRouter.post(
  "/",
  (req, res, next) => {

    let equipDetails = req.body.installedequip;
    //console.log ("equipment used: "+ equipDetails)
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
      var sql = "CALL sp_updatesminfo(?)";
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
    else if (equipDetails.installedequip == "PTP") {
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
      var sql = "CALL sp_updateptpinfo(?)";
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
    else if (equipDetails.installedequip == "AP") {
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
      var sql = "CALL sp_updateapinfo(?)";
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
    else if (equipDetails.installedequip == "SW") {
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
      var sql = "CALL sp_updateswitchinfo(?)";
      var values = [
        swname,
        swip,
        status,
        swversion,
        note,
        swserial,
        civil,
        BankName,
        BankBranch,
      ];
      db.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
    }
    else if (equipDetails.installedequip == "camera") {
      let BankName = equipDetails.BankName;
      let BankBranch = equipDetails.BranchName;
      let camname = equipDetails.camname;
      let camip = equipDetails.camip;
      let camserial = equipDetails.camserial;
      let status = equipDetails.status;
      let note = equipDetails.note;
      //console.log (BankName+BankBranch+smname)
      var sql = "CALL sp_updatecamerainfo(?)";
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
module.exports = equipmentRouter;