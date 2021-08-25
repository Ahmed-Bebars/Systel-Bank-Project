const express = require('express');
const db=require('../helper/databaseconnection');
const auth = require('../model/user')
const bankinfoRouter = express.Router();
console.log(auth.body)
/*psot action handling*/
bankinfoRouter.post(
    "/",
    (req, res, next) => {
        console.log("request from body:"+req.body)
        //console.log(bankDetails=req.body.Bankinfo)
        let bankDetails=req.body.Bankinfo;
        console.log(bankDetails)
        let BankName = bankDetails.BankName;
        let BankBranch = bankDetails.BranchName;
        let Address = bankDetails.Address;
        let gpsaddress = bankDetails.GpsAddress;
        let ZoneName = bankDetails.ZoneName;
        var sql = "CALL sp_insertintoBankinfo(?)";  
        var values = [  
            BankName,
            BankBranch,
            Address,
            gpsaddress,
            ZoneName
        ];  
        db.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
          });
    }  
)


module.exports = bankinfoRouter;

