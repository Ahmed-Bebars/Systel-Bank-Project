

document.addEventListener('DOMContentLoaded', (event) => {
    //define variables
    let bankname = document.querySelector("#bankname")
    let branchname = document.querySelector("#branchname")
    let equipmentname = document.querySelector("#equipmentname")
    let forum = document.getElementById("installeqipment")
    let btn = document.getElementById("submitbtn")
    let status = `<select name="status" id="status">
    <option value="up">up</option>
    <option value="down">Down</option>
  </select>`
    function removeAll(branchname) {
        if (branchname.options.length > 0) {
            while (branchname.options.length > 1) {
                branchname.remove(1);
            }
        }
    }

    const getbranch = async () => {
        removeAll(branchname);
        let url = '/API/systel/updateinstalledequip/update';
        if (bankname.value != null) {

            url = url + "?bankname=" + bankname.value;
            console.log(url)
        }
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            }//,body: JSON.stringify(data), // body data type must match "Content-Type" header        
        });
        try {
            const branchData = await response.json();
            //console.log (branchData)
            branchData.forEach(element => {
                console.log(element.Bank_Branch)
                let branchvalue = element.Bank_Branch;
                // create option using DOM
                const newOption = document.createElement('option');
                const optionText = document.createTextNode(branchvalue);
                // set option text
                newOption.appendChild(optionText);
                // and option value
                newOption.setAttribute('value', branchvalue);
                branchname.appendChild(newOption);
            });
            console.log('data fetch done');
        } catch (error) {
            alert("error:", error);
        }
    }

    const getequipmentname = async () => {
        let url = '/API/systel/updateinstalledequip/equipmentname';
        if (bankname.value != null) {
            url = url + "?equipmentname=" + equipmentname.value + "&" + "bankname=" + bankname.value + "&" + "branchname=" + branchname.value;
            console.log(url)
        }
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            }//,body: JSON.stringify(data), // body data type must match "Content-Type" header        
        });
        try {
            const equipmentnamedata = await response.json();
            //console.log (branchData)
            equipmentnamedata.forEach(element => {
                console.log(element.Name)
                let namevalue = element.Name;
                // create option using DOM
                const newOption = document.createElement('option');
                const optionText = document.createTextNode(namevalue);
                // set option text
                newOption.appendChild(optionText);
                // and option value
                newOption.setAttribute('value', namevalue);
                installedequipmentname.appendChild(newOption);
            });
            console.log('data fetch done');
        } catch (error) {
            alert("error:", error);
        }
    }

    const getequipment = async () => {
        let url = '/API/systel/updateinstalledequip/update/equip';
        if (equipmentname.value != null & equipmentname.value != 'PTP') {

            url = url + "?equipmentname=" + equipmentname.value + "&" + "bankname=" + bankname.value + "&" + "branchname=" + branchname.value;
            console.log(url)
        }
        else if (equipmentname.value != null & equipmentname.value == 'PTP') {
            url = url + "?equipmentname=" + equipmentname.value + "&" + "installedequipmentname=" + installedequipmentname.value + "&" + "bankname=" + bankname.value + "&" + "branchname=" + branchname.value;
            console.log(url)
        }
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            }//,body: JSON.stringify(data), // body data type must match "Content-Type" header        
        });
        try {
            const equipmentData = await response.json();
            //console.log (branchData)
            if (equipmentname.value == 'SM' & bankname.value != "" & branchname.value != "" & equipmentData.length != 0) {
                console.log(equipmentData)
                let SM_Name = equipmentData[0].SM_Name;
                let SM_IP = equipmentData[0].SM_IP;
                let SM_Version = equipmentData[0].SW_Version;
                let SM_Note = equipmentData[0].Note;
                let SM_serial = equipmentData[0].SM_Serial;
                let SM_MAC = equipmentData[0].SM_MACAddr;
                let SM_civil = equipmentData[0].Civilwork;
                console.log(SM_civil)
                let newFragment = document.createElement('div');
                newFragment.id = "eqp";
                newFragment.innerHTML = `
                <label for="smname">SM Name</label>
                <input type="text" id="smname" name="smname" value="${SM_Name}" required data-error="Please fill empty field">
                <label for="smip">SM IP</label>
                <input type="text" id="smip" name="smip" value="${SM_IP}">
                <label for="smserial">SM Serial</label>
                <input type="text" id="smserial" name="smserial" value="${SM_serial}">
                <label for="smmacaddr">SM MAC Address</label>
                <input type="text" id="smmacaddr" name="smmacaddr" value="${SM_MAC}" readonly="readonly">
                <label for="status">Status</label>
                ${status}
                <label for="swversion">Software Version</label>
                <input type="text" id="swversion" name="swversion" value="${SM_Version}">
                <label for="civil">Civil Work</label>
                <input type="text" id="civil" name="civil" value="${SM_civil}">
                <label for="note">Notes</label>
                <input type="text" id="note" name="note" value="${SM_Note}">
                `
                //forum.appendChild(newFragment)
                forum.insertBefore(newFragment, btn)

            }
            else if (equipmentname.value == 'PTP' & bankname.value != "" & branchname.value != "" & equipmentData.length != 0) {

                console.log(installedequipmentname.value)

                //let PTP_Name = equipmentData[0].PTP_Name;
                let PTP_IP = equipmentData[0].PTP_IP;
                let PTP_Version = equipmentData[0].SW_Version;
                let PTP_Note = equipmentData[0].Note;
                let PTP_serial = equipmentData[0].PTP_Serial;
                let PTP_BW = equipmentData[0].PTP_BW;
                let PTP_freq = equipmentData[0].PTP_freq;
                let PTP_Azmith = equipmentData[0].PTP_Azmith;
                let PTP_MAC = equipmentData[0].PTP_MACAddr;
                let PTP_civil = equipmentData[0].CivilWork;

                console.log(PTP_civil)
                let newFragment = document.createElement('div');
                newFragment.id = "eqp";
                newFragment.innerHTML = `
                <label for="ptpip">PTP IP </label>
                <input type="text" id="ptpip" name="ptpip" value="${PTP_IP}">
                <label for="ptpserial">PTP Serial</label>
                <input type="text" id="ptpserial" name="ptpserial" value="${PTP_serial}">
                <label for="ptpmacaddr">PTP MAC Address</label>
                <input type="text" id="ptpmacaddr" name="ptpmacaddr" value="${PTP_MAC}" readonly="readonly">
                <label for="ptpfreq">PTP Frequency</label>
                <input type="text" id="ptpfreq" name="ptpfreq" value="${PTP_freq}">
                <label for="ptpbw">PTP BW</label>
                <input type="text" id="ptpbw" name="ptpbw" value="${PTP_BW}">
                <label for="ptpazmith">PTP Azimuth</label>
                <input type="text" id="ptpazmith" name="ptpazmith" value="${PTP_Azmith}">
                <label for="status">Status</label>
                ${status}
                <label for="swversion">Software Version</label>
                <input type="text" id="swversion" name="swversion" value="${PTP_Version}">
                <label for="civil">Civil Work</label>
                <input type="text" id="civil" name="civil" value="${PTP_civil}">
                <label for="note">Notes</label>
                <input type="text" id="note" name="note" value="${PTP_Note}">
            `
                forum.insertBefore(newFragment, btn)


            }
            else if (equipmentname.value == 'AP' & bankname.value != "" & branchname.value != "" & equipmentData.length != 0) {
                console.log(equipmentData)
                let AP_Name = equipmentData[0].AP_Name;
                let AP_IP = equipmentData[0].AP_IP;
                let AP_Version = equipmentData[0].SW_Version;
                let AP_Note = equipmentData[0].Note;
                let AP_serial = equipmentData[0].AP_Serial;
                let AP_BW = equipmentData[0].AP_BW;
                let AP_freq = equipmentData[0].AP_freq;
                let AP_Azmith = equipmentData[0].AP_Azmith;
                let AP_MAC = equipmentData[0].AP_MACAddr;
                let AP_civil = equipmentData[0].CivilWork;

                console.log(AP_Name)
                let newFragment = document.createElement('div');
                newFragment.id = "eqp";
                newFragment.innerHTML = `
                <label for="apname">AP Name</label>
                <input type="text" id="apname" name="apname" value="${AP_Name}" required data-error="Please fill empty field">
                <label for="apip">AP IP </label>
                <input type="text" id="apip" name="apip" value="${AP_IP}">
                <label for="apserial">AP Serial</label>
                <input type="text" id="apserial" name="apserial" value="${AP_serial}">
                <label for="apmacaddr">AP MAC Address</label>
                <input type="text" id="apmacaddr" name="apmacaddr" value="${AP_MAC} readonly="readonly">
                <label for="apfreq">AP Frequency</label>
                <input type="text" id="apfreq" name="apfreq" value="${AP_freq}">
                <label for="apbw">AP BW</label>
                <input type="text" id="apbw" name="apbw" value="${AP_BW}">
                <label for="apazmith">AP Azimuth</label>
                <input type="text" id="apazmith" name="apazmith" value="${AP_Azmith}">
                <label for="status">Status</label>
                ${status}
                <label for="swversion">Software Version</label>
                <input type="text" id="swversion" name="swversion" value="${AP_Version}">
                <label for="civil">Civil Work</label>
                <input type="text" id="civil" name="civil" value="${AP_civil}">
                <label for="note">Notes</label>
                <input type="text" id="note" name="note" value="${AP_Note}">
            `
                forum.insertBefore(newFragment, btn)

            }
            else if (equipmentname.value == 'SW' & bankname.value != "" & branchname.value != "" & equipmentData.length != 0) {
                console.log(equipmentData)
                let switch_Name = equipmentData[0].switch_Name;
                let switch_IP = equipmentData[0].switch_IP;
                let switch_Version = equipmentData[0].SW_Version;
                let switch_Note = equipmentData[0].Note;
                let switch_serial = equipmentData[0].switch_Serial;
                let switch_civil = equipmentData[0].CivilWork;

                console.log(switch_civil)
                let newFragment = document.createElement('div');
                newFragment.id = "eqp";
                newFragment.innerHTML = `
                <label for="swname">Switch Name</label>
                <input type="text" id="swname" name="swname" value="${switch_Name}" required data-error="Please fill empty field">
                <label for="swip">Switch IP </label>
                <input type="text" id="swip" name="swip" value="${switch_IP}">
                <label for="swserial">Switch Serial</label>
                <input type="text" id="swserial" name="swserial" value="${switch_serial} readonly="readonly">
                <label for="status">Status</label>
                ${status}
                <label for="swversion">Software Version</label>
                <input type="text" id="swversion" name="swversion" value="${switch_Version}">
                <label for="civil">Civil Work</label>
                <input type="text" id="civil" name="civil" value="${switch_civil}">
                <label for="note">Notes</label>
                <input type="text" id="note" name="note" value="${switch_Note}">
                `

                //forum.appendChild(newFragment)
                forum.insertBefore(newFragment, btn)

            }
            else if (equipmentname.value == 'camera' & bankname.value != "" & branchname.value != "" & equipmentData.length != 0) {
                console.log(equipmentData)
                let camera_Name = equipmentData[0].camera_Name;
                let camera_IP = equipmentData[0].camera_IP;
                let camera_Note = equipmentData[0].Note;
                let camera_serial = equipmentData[0].camera_Serial;
                console.log(camera_serial)
                let newFragment = document.createElement('div');
                newFragment.id = "eqp";
                newFragment.innerHTML = `
                        <label for="camname">Camera Name</label>
                        <input type="text" id="camname" name="camname" value="${camera_Name}" readonly="readonly">
                        <label for="camip">Camera IP </label>
                        <input type="text" id="camip" name="camip" value="${camera_IP}">
                        <label for="camserial">Camera Serial</label>
                        <input type="text" id="camserial" name="camserial" value="${camera_serial}" >
                        <label for="status">Status</label>
                        ${status}
                        <label for="note">Notes</label>
                        <input type="text" id="note" name="note" value="${camera_Note}">
                        `

                //forum.appendChild(newFragment)
                forum.insertBefore(newFragment, btn)

            }
            else {
                window.alert("please select Bank name first and Branch OR no data available for this Module in this Bank");
            }

            /*if (sqlData.alarms != null && sqlData.alarms.length > 0) {
                console.log('new Data Fetched');
                populateNewAlarms(sqlData.alarms);
            }*/
            console.log('data fetch done');
        } catch (error) {
            alert("error:", error);
        }
    }

    equipmentname.addEventListener('change', (event) => {

        let selectvalue = document.getElementById("equipmentname")

        let eqelment = document.getElementById("eqp");
        if (selectvalue.value == "") {
            eqelment.parentElement.removeChild(eqelment);
        }
        console.log(selectvalue.value)

        if (selectvalue.value == 'PTP') {
            if (eqelment != null) {
                eqelment.parentElement.removeChild(eqelment);
            }
            let ptpabel = document.createElement("Label");
            ptpabel.setAttribute("for", "installedequipmentname");
            ptpabel.innerHTML = "PTP Name";
            forum.insertBefore(ptpabel, btn)
            let ptpList = document.createElement("select");
            ptpList.id = "installedequipmentname";
            forum.insertBefore(ptpList, btn)
            let ptpoption = document.createElement("option");
            ptpoption.value = ""
            ptpoption.text = "Select One equipment …"
            ptpList.appendChild(ptpoption);

            console.log(selectvalue)
            getequipmentname();
            let installedequipmentname = document.querySelector("#installedequipmentname")
            installedequipmentname.addEventListener('change', (event) => {
                getequipment();
                if (installedequipmentname.value != "") {
                    let equip = document.getElementById("eqp");
                    equip.parentElement.removeChild(equip)
                }
            })

        }
        else {
            if (typeof (installedequipmentname) != 'undefined') {
                let ptpabel = document.getElementsByTagName("label");
                ptpabel[3].remove();
                installedequipmentname.parentElement.removeChild(installedequipmentname)
            }
            if (selectvalue.value == "SM") {
                if (eqelment != null) {
                    eqelment.parentElement.removeChild(eqelment);
                }
            }
            else if (selectvalue.value == "AP") {
                if (eqelment != null) {
                    eqelment.parentElement.removeChild(eqelment);
                }
            }
            else if (selectvalue.value == "SW") {
                if (eqelment != null) {
                    eqelment.parentElement.removeChild(eqelment);
                }
            }
            else if (selectvalue.value == "camera") {
                if (eqelment != null) {
                    eqelment.parentElement.removeChild(eqelment);
                }
            }
            console.log(selectvalue.value)
            getequipment();
        }

    })
    bankname.addEventListener('change', (event) => {
        getbranch();
    })

    branchname.addEventListener('change', (event) => {
        if (equipmentname.value != "") {
            let eqelment = document.getElementById("eqp");
            eqelment.parentElement.removeChild(eqelment);
            getequipment();
        }
    })
})