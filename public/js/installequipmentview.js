

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
        let url = '/installedequip/get';
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

            /*if (sqlData.alarms != null && sqlData.alarms.length > 0) {
                console.log('new Data Fetched');
                populateNewAlarms(sqlData.alarms);
            }*/
            console.log('data fetch done');
        } catch (error) {
            alert("error:", error);
        }
    }
    //SM Function
    function generatesmtemplate() {
        let newFragment = document.createElement('div');
        newFragment.id = "eqp";
        newFragment.innerHTML = `
        <label for="smname">SM Name</label>
        <input type="text" id="smname" name="smname" placeholder="SM name.." required data-error="Please fill empty field">
        <label for="smip">SM IP</label>
        <input type="text" id="smip" name="smip" placeholder="SM IP..">
        <label for="smserial">SM Serial</label>
        <input type="text" id="smserial" name="smserial" placeholder="SM Serial..">
        <label for="smmacaddr">SM MAC Address</label>
        <input type="text" id="smmacaddr" name="smmacaddr" placeholder="SM MAC Address.." required data-error="Please fill empty field">
        <label for="status">Status</label>
        ${status}
        <label for="swversion">Software Version</label>
        <input type="text" id="swversion" name="swversion" placeholder="Software version..">
        <label for="civil">Civil Work</label>
        <input type="text" id="civil" name="civil" placeholder="Civil work..">
        <label for="note">Notes</label>
        <input type="text" id="note" name="note" placeholder="Notes..">
        `
        //forum.appendChild(newFragment)
        forum.insertBefore(newFragment, btn)
    }

    //PTP function 
    function generateptptemplate() {
        let newFragment = document.createElement('div');
        newFragment.id = "eqp";
        newFragment.innerHTML = `
    <label for="ptpname">PTP Name</label>
    <input type="text" id="installedequipmentname" name="ptpname" placeholder="PTP name.." required data-error="Please fill empty field">
    <label for="ptpip">PTP IP </label>
    <input type="text" id="ptpip" name="ptpip" placeholder="PTP IP..">
    <label for="ptpserial">PTP Serial</label>
    <input type="text" id="ptpserial" name="ptpserial" placeholder="PTP Serial..">
    <label for="ptpmacaddr">PTP MAC Address</label>
    <input type="text" id="ptpmacaddr" name="ptpmacaddr" placeholder="PTP MAC Address.." required data-error="Please fill empty field">
    <label for="ptpfreq">PTP Frequency</label>
    <input type="text" id="ptpfreq" name="ptpfreq" placeholder="PTP Frequency..">
    <label for="ptpbw">PTP BW</label>
    <input type="text" id="ptpbw" name="ptpbw" placeholder="PTP Bandwidth..">
    <label for="ptpazmith">PTP Azimuth</label>
    <input type="text" id="ptpazmith" name="ptpazmith" placeholder="PTP Azimuth..">
    <label for="status">Status</label>
    ${status}
    <label for="swversion">Software Version</label>
    <input type="text" id="swversion" name="swversion" placeholder="Software version..">
    <label for="civil">Civil Work</label>
    <input type="text" id="civil" name="civil" placeholder="Civil work..">
    <label for="note">Notes</label>
    <input type="text" id="note" name="note" placeholder="Notes..">
    `
        forum.insertBefore(newFragment, btn)
    }
    //Access Point function 
    function generateAPtemplate() {
        let newFragment = document.createElement('div');
        newFragment.id = "eqp";
        newFragment.innerHTML = `
    <label for="apname">Access Point Name</label>
    <input type="text" id="apname" name="apname" placeholder="Access Point name.." required data-error="Please fill empty field">
    <label for="apip">Access point IP </label>
    <input type="text" id="apip" name="apip" placeholder="Access Point IP..">
    <label for="apserial">Access Point Serial</label>
    <input type="text" id="apserial" name="apserial" placeholder="Access Point Serial..">
    <label for="apmacaddr">Access Point MAC Address</label>
    <input type="text" id="apmacaddr" name="apmacaddr" placeholder="Access Point MAC Address.." required data-error="Please fill empty field">
    <label for="apfreq">Access Point Frequency</label>
    <input type="text" id="apfreq" name="apfreq" placeholder="Access Point Frequency..">
    <label for="apbw">Access Point BW</label>
    <input type="text" id="apbw" name="apbw" placeholder="Access Point Bandwidth..">
    <label for="apazmith">Access Point Azimuth</label>
    <input type="text" id="apazmith" name="apazmith" placeholder="Access Point Azimuth..">
    <label for="status">Status</label>
    ${status}
    <label for="swversion">Software Version</label>
    <input type="text" id="swversion" name="swversion" placeholder="Software version..">
    <label for="civil">Civil Work</label>
    <input type="text" id="civil" name="civil" placeholder="Civil work..">
    <label for="note">Notes</label>
    <input type="text" id="note" name="note" placeholder="Notes..">
    `

        //forum.appendChild(newFragment)
        forum.insertBefore(newFragment, btn)
    }
    //Switch function 
    function generateSWtemplate() {
        let newFragment = document.createElement('div');
        newFragment.id = "eqp";
        newFragment.innerHTML = `
        <label for="swname">Switch Name</label>
        <input type="text" id="swname" name="swname" placeholder="Switch name.." required data-error="Please fill empty field">
        <label for="swip">Switch IP </label>
        <input type="text" id="swip" name="swip" placeholder="Switch IP..">
        <label for="swserial">Switch Serial</label>
        <input type="text" id="swserial" name="swserial" placeholder="Switch Serial.." required data-error="Please fill empty field">
        <label for="status">Status</label>
        ${status}
        <label for="swversion">Software Version</label>
        <input type="text" id="swversion" name="swversion" placeholder="Software version..">
        <label for="civil">Civil Work</label>
        <input type="text" id="civil" name="civil" placeholder="Civil work..">
        <label for="note">Notes</label>
        <input type="text" id="note" name="note" placeholder="Notes..">
        <form id="ConfigFileForm" enctype="multipart/form-data">
            <label for="files">configurtion file</label>
            <input type="file" name="files" id="file" />
        </form>
        `

        //forum.appendChild(newFragment)
        forum.insertBefore(newFragment, btn)
        let fileUpload = document.querySelector("#file");
        let fileForm = document.querySelector("#ConfigFileForm");
        fileForm.addEventListener('submit',(event)=>{
            event.preventDefault();
            insertequipinfo(event);
        });

    }

    //ACamera function 
    function generatecameratemplate() {
        let newFragment = document.createElement('div');
        newFragment.id = "eqp";
        newFragment.innerHTML = `
                <label for="camname">Camera Name</label>
                <input type="text" id="camname" name="camname" placeholder="Camera name.." required data-error="Please fill empty field">
                <label for="camip">Camera IP </label>
                <input type="text" id="camip" name="camip" placeholder="Camera IP..">
                <label for="camserial">Camera Serial</label>
                <input type="text" id="camserial" name="camserial" placeholder="Camera Serial.." >
                <label for="status">Status</label>
                ${status}
                <label for="note">Notes</label>
                <input type="text" id="note" name="note" placeholder="Notes..">
                `

        //forum.appendChild(newFragment)
        forum.insertBefore(newFragment, btn)
    }
    equipmentname.addEventListener('change', (event) => {
        let selectvalue = document.getElementById("equipmentname")
        let eqelment = document.getElementById("eqp");
        if (selectvalue.value == "") {
            eqelment.parentElement.removeChild(eqelment);
        }
        console.log(selectvalue.value)
        if (selectvalue.value == "SM") {
            if (eqelment != null) {
                eqelment.parentElement.removeChild(eqelment);
            }

            generatesmtemplate()
        }
        else if (selectvalue.value == "PTP") {
            if (eqelment != null) {
                eqelment.parentElement.removeChild(eqelment);
            }
            generateptptemplate()

        }
        else if (selectvalue.value == "AP") {
            if (eqelment != null) {
                eqelment.parentElement.removeChild(eqelment);
            }
            generateAPtemplate()

        }
        else if (selectvalue.value == "SW") {
            if (eqelment != null) {
                eqelment.parentElement.removeChild(eqelment);
            }
            generateSWtemplate()

        }
        else if (selectvalue.value == "camera") {
            if (eqelment != null) {
                eqelment.parentElement.removeChild(eqelment);
            }
            generatecameratemplate()

        }
    })
    bankname.addEventListener('change', (event) => {


        getbranch();

    })
})