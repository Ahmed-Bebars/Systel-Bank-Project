//const { response } = require("express");
function insertbankinfo(event) {
    let config = new Object();
    config['Bankinfo'] = generateBankinfoSettings();
    let response = sendDataToServer('/API/systel/bankinfo/', config)
    console.log(response)
}

function fireinsertequipinfoevent(event) {
    let fileForm = document.querySelector("#ConfigFileForm");
    if (!fileForm){
        let flag = "1"
        insertequipinfo(null,flag)
    }
    else {
        fileForm.dispatchEvent(new Event('submit'));
    }
    
}
/**
 * This functionis a lhandler for the file form submit action
 * @param {*} event the submit event fired by fireinsertequipinfoevent function
 */
function insertequipinfo(event,flag) {
    if (flag == "1"){

        let config = new Object();
        config['installedequip'] = generateinstalledequipment();
        let response = sendDataToServer('/installedequip/', config)
        console.log(response)

    }
    else{

        console.log("start")
        const formData = new FormData();
        formData.append("files", document.querySelector("#file").files[0]);
        /*let config = new Object();
        config['installedequip'] = generateinstalledequipment();*/
         formData.append('installedequip',JSON.stringify(generateinstalledequipment()));
        let response = sendDataToServer('/installedequip/', formData,"formData")
        console.log(response)

    }

}

function updateequipinfo(event) {
    let config = new Object();
    config['installedequip'] = generateinstalledequipment();
    let response = sendDataToServer('/API/systel/updateinstalledequip/', config)
    console.log(response)

}

const sendDataToServer = async (url = '', data = {}, bodyType = 'Normal') => {
    console.log("sendToServer:", url)
    let response;
    if (bodyType == 'formData') {
        response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            body: data
        });
    } else {

        response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header        
        });
    }
    try {
        const newData = response.json();
        return newData
    } catch (error) {
        alert("error:", error);
    }
}


function generateBankinfoSettings() {
    let bankinfo = new Object();
    bankinfo['BankName'] = document.querySelector('#bankname').value;
    bankinfo['BranchName'] = document.querySelector('#branchname').value;
    bankinfo['Address'] = document.querySelector('#address').value;
    bankinfo['GpsAddress'] = document.querySelector('#gpsaddress').value;
    bankinfo['ZoneName'] = document.querySelector('#ZoneName').value;
    if (bankinfo['BankName'] == '' || bankinfo['BranchName'] == '' || bankinfo['Address'] == '') {
        alert("Please enter required fields");
        return;
    }
    else {
        return bankinfo;
    }
}

function generateinstalledequipment() {
    let installedequip = new Object();
    installedequip['installedequip'] = document.querySelector('#equipmentname').value;
    if (document.querySelector('#equipmentname').value == "SM") {
        installedequip['BankName'] = document.querySelector('#bankname').value;
        installedequip['BranchName'] = document.querySelector('#branchname').value;
        installedequip['smname'] = document.querySelector('#smname').value;
        installedequip['smip'] = document.querySelector('#smip').value;
        installedequip['smserial'] = document.querySelector('#smserial').value;
        installedequip['smmacaddr'] = document.querySelector('#smmacaddr').value;
        installedequip['status'] = document.querySelector('#status').value;
        installedequip['swversion'] = document.querySelector('#swversion').value;
        installedequip['civil'] = document.querySelector('#civil').value;
        installedequip['note'] = document.querySelector('#note').value;
        if (installedequip['smmacaddr'] == '' || installedequip['smname'] == '') {
            alert("Please enter required fields");
            return;
        }
        else {
            return installedequip;
        }
    }
    else if (document.querySelector('#equipmentname').value == "PTP") {
        installedequip['BankName'] = document.querySelector('#bankname').value;
        installedequip['BranchName'] = document.querySelector('#branchname').value;
        installedequip['ptpname'] = document.querySelector('#installedequipmentname').value;
        installedequip['ptpip'] = document.querySelector('#ptpip').value;
        installedequip['ptpserial'] = document.querySelector('#ptpserial').value;
        installedequip['ptpmacaddr'] = document.querySelector('#ptpmacaddr').value;
        installedequip['status'] = document.querySelector('#status').value;
        installedequip['ptpfreq'] = document.querySelector('#ptpfreq').value;
        installedequip['ptpbw'] = document.querySelector('#ptpbw').value;
        installedequip['ptpazmith'] = document.querySelector('#ptpazmith').value;
        installedequip['swversion'] = document.querySelector('#swversion').value;
        installedequip['civil'] = document.querySelector('#civil').value;
        installedequip['note'] = document.querySelector('#note').value;
        if (installedequip['ptpmacaddr'] == '' || installedequip['ptpname'] == '') {
            alert("Please enter required fields");
            return;
        }
        else {
            return installedequip;
        }
    }
    else if (document.querySelector('#equipmentname').value == "AP") {
        installedequip['BankName'] = document.querySelector('#bankname').value;
        installedequip['BranchName'] = document.querySelector('#branchname').value;
        installedequip['apname'] = document.querySelector('#apname').value;
        installedequip['apip'] = document.querySelector('#apip').value;
        installedequip['apserial'] = document.querySelector('#apserial').value;
        installedequip['apmacaddr'] = document.querySelector('#apmacaddr').value;
        installedequip['status'] = document.querySelector('#status').value;
        installedequip['apfreq'] = document.querySelector('#apfreq').value;
        installedequip['apbw'] = document.querySelector('#apbw').value;
        installedequip['apazmith'] = document.querySelector('#apazmith').value;
        installedequip['swversion'] = document.querySelector('#swversion').value;
        installedequip['civil'] = document.querySelector('#civil').value;
        installedequip['note'] = document.querySelector('#note').value;
        if (installedequip['apmacaddr'] == '' || installedequip['apname'] == '') {
            alert("Please enter required fields");
            return;
        }
        else {
            return installedequip;
        }

    }
    else if (document.querySelector('#equipmentname').value == "SW") {
        installedequip['BankName'] = document.querySelector('#bankname').value;
        installedequip['BranchName'] = document.querySelector('#branchname').value;
        installedequip['swname'] = document.querySelector('#swname').value;
        installedequip['swip'] = document.querySelector('#swip').value;
        installedequip['swserial'] = document.querySelector('#swserial').value;
        installedequip['status'] = document.querySelector('#status').value;
        installedequip['swversion'] = document.querySelector('#swversion').value;
        installedequip['civil'] = document.querySelector('#civil').value;
        installedequip['note'] = document.querySelector('#note').value;
        if (installedequip['swserial'] == '' || installedequip['swname'] == '') {
            alert("Please enter required fields");
            return;
        }
        else {
            return installedequip;
        }
    }
    else if (document.querySelector('#equipmentname').value == "camera") {
        installedequip['BankName'] = document.querySelector('#bankname').value;
        installedequip['BranchName'] = document.querySelector('#branchname').value;
        installedequip['camname'] = document.querySelector('#camname').value;
        installedequip['camip'] = document.querySelector('#camip').value;
        installedequip['camserial'] = document.querySelector('#camserial').value;
        installedequip['status'] = document.querySelector('#status').value;
        installedequip['note'] = document.querySelector('#note').value;
        if (installedequip['camname'] == '') {
            alert("Please enter required fields");
            return;
        }
        else {
            return installedequip;
        }
    }

}