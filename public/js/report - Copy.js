

document.addEventListener('DOMContentLoaded', (event) => {
    //define variables
    let reportnameselector = document.querySelector("#reportname")
    //let branchname = document.querySelector("#branchname")
    const apply_selection = (e) => {
        let selectbox = document.querySelectorAll('input.test');
        selectbox.forEach(element => {
            if (!element.checked) {
                let colelements = document.querySelectorAll('.' + element.id)
                colelements.forEach(colelement => {
                    colelement.classList.add('hidden')
                });
            } else {
                let colelements = document.querySelectorAll('.' + element.id)
                colelements.forEach(colelement => {
                    colelement.classList.remove('hidden')
                });
            }
        })
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
            //let divcheck = document.getElementById("check");
            //set table header
            var col = [];
            for (var i = 0; i < reportData.length; i++) {
                for (var key in reportData[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                        console.log(key)
                        var checkbox = document.createElement("INPUT");
                        // Assigning the attributes
                        // to created checkbox
                        checkbox.type = 'checkbox';
                        checkbox.name = key;
                        checkbox.value = key;
                        checkbox.id = key;
                        checkbox.className = 'test';
                        //checkbox.setAttribute("type", "checkbox");
                        // creating label for checkbox
                        var label = document.createElement('label');
                        // assigning attributes for
                        // the created label tag
                        label.htmlFor = key;
                        // appending the created text to
                        // the created label tag
                        label.appendChild(document.createTextNode(key));
                        newcheckdiv.appendChild(checkbox);
                        newcheckdiv.appendChild(label);
                    }
                }
            }
            let applyselection = document.createElement('button');
            applyselection.classList.add('btn');
            applyselection.addEventListener('click', apply_selection);
            applyselection.innerText = "Apply selection"
            newcheckdiv.appendChild(applyselection);
            // CREATE DYNAMIC TABLE.

            var table = document.createElement("table");
            table.setAttribute("id", "table");
            //table.border = "1";

            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            var row = table.insertRow(-1);                   // TABLE ROW.
            var tr = document.createElement("tr");
            var thead = document.createElement("thead");
            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.
                th.classList.add(col[i]);
                th.innerHTML = col[i];
                tr.appendChild(th);
            }
            thead.appendChild(tr);
            row.appendChild(thead)

            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (var i = 0; i < reportData.length; i++) {

                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.classList.add(col[j]);
                    tabCell.innerHTML = reportData[i][col[j]];
                }
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.

            divContainer.innerHTML = "";
            divContainer.appendChild(table);
            console.log('data fetch done');
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
})