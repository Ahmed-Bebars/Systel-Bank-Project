

document.addEventListener('DOMContentLoaded', (event) => {
    //define variables
    let reportnameselector = document.querySelector("#reportname")
    //let branchname = document.querySelector("#branchname")

        const updatereportcol = async () => {
            let selectbox = document.querySelectorAll('input.test');
            var updateselector = '';
            for (i = 0; i < selectbox.length; ++i) {
                if (selectbox[i].checked) {
                    updateselector = updateselector + "&" + selectbox[i].value + "=" + selectbox[i].value;
                }
            }
            console.log(updateselector)
            let url = '/API/systel/report/update';
            let updatedreportname = document.querySelector("#reportname")
            url = url + "?updatereportname=" + updatedreportname.value + updateselector;
            console.log(url)
            const updateresponse = await fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                }//,body: JSON.stringify(data), // body data type must match "Content-Type" header        
            });
            try {
                const updatereportData = await updateresponse.json();
                //console.log(reportData);
                var divContainer = document.getElementById("showdata");

                //set table header
                let cols = Object.keys(updatereportData[0]);
                console.log(cols)
                let headerRow = cols
                    .map(col => `<th>${col}</th>`)
                    .join("");

                let rows = updatereportData
                    .map(row => {
                        let tds = cols.map(col => `<td>${row[col]}</td>`).join("");
                        return `<tr>${tds}</tr>`;
                    })
                    .join("");
                const table = `
            <table id="example">
                <thead>
                    <tr>${headerRow}</tr>
                <thead>
                <tbody>
                    ${rows}
                <tbody>
            <table>`;
                // CREATE DYNAMIC TABLE.

                // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.

                divContainer.innerHTML = table;
                //divContainer.appendChild(table);
                console.log('data fetch done');
                $('#example').DataTable();
                //let buttondiv = document.getElementById('test')
                let downloadbutton = document.createElement('button');
                downloadbutton.classList.add('btn');
                downloadbutton.addEventListener('click', exportTableToCSV);
                downloadbutton.innerText = "download file"
                divContainer.appendChild(downloadbutton);
            } catch (error) {
                alert("error:", error);
            }
        }

    const getreportdata = async () => {
        let url = '/API/systel/report/get';

        url = url + "?reportname=" + reportname.value;
        console.log(url)

        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            }//,body: JSON.stringify(data), // body data type must match "Content-Type" header        
        });
        try {
            const reportData = await response.json();
            //console.log(reportData);
            var divContainer = document.getElementById("showdata");
            //remove old check box before create new 
            if (document.getElementById('check') != null) {
                let removechild = document.getElementById('check');
                removechild.parentElement.removeChild(removechild);
            }

            newcheckdiv = document.createElement('div');
            newcheckdiv.setAttribute("id", "check");
            document.body.insertBefore(newcheckdiv, divContainer)
            let checkboxarray = Object.keys(reportData[0]);
            //console.log(checkboxarray)
            checkboxarray.forEach(checkboxelment => {
                console.log(checkboxelment)
                var checkbox = document.createElement("INPUT");
                // Assigning the attributes
                // to created checkbox
                checkbox.type = 'checkbox';
                checkbox.name = checkboxelment;
                checkbox.value = checkboxelment;
                checkbox.id = checkboxelment;
                checkbox.className = 'test';
                //checkbox.setAttribute("type", "checkbox");
                // creating label for checkbox
                var label = document.createElement('label');
                // assigning attributes for
                // the created label tag
                label.htmlFor = checkboxelment;
                // appending the created text to
                // the created label tag
                label.appendChild(document.createTextNode(checkboxelment));
                newcheckdiv.appendChild(checkbox);
                newcheckdiv.appendChild(label);

            })

            //set table header
            let cols = Object.keys(reportData[0]);
            console.log(cols)
            let headerRow = cols
                .map(col => `<th>${col}</th>`)
                .join("");

            let rows = reportData
                .map(row => {
                    let tds = cols.map(col => `<td>${row[col]}</td>`).join("");
                    return `<tr>${tds}</tr>`;
                })
                .join("");
            const table = `
            <table id="example">
                <thead>
                    <tr>${headerRow}</tr>
                <thead>
                <tbody>
                    ${rows}
                <tbody>
            <table>`;

            let applyselection = document.createElement('button');
            applyselection.classList.add('btn');
            applyselection.addEventListener('click', apply_selection);
            applyselection.innerText = "Apply selection"
            newcheckdiv.appendChild(applyselection);
            // CREATE DYNAMIC TABLE.

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.

            divContainer.innerHTML = table;
            //divContainer.appendChild(table);
            console.log('data fetch done');
            $('#example').DataTable();
            //let buttondiv = document.getElementById('test')
            let downloadbutton = document.createElement('button');
            downloadbutton.classList.add('btn');
            downloadbutton.addEventListener('click', exportTableToCSV);
            downloadbutton.innerText = "download file"
            divContainer.appendChild(downloadbutton);
        } catch (error) {
            alert("error:", error);
        }
    }

    reportnameselector.addEventListener('change', (event) => {

        getreportdata();
    })

    const apply_selection = (e) => {
        updatereportcol();
    }
})