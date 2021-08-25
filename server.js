const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(session({
	secret: 'secret',
	resave: true,   
	saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
//collect pages routes
const index = require('./routers/index');
const bankinfo = require('./routers/bankinfo');
const bankequipment = require ('./routers/installedequipment');
const updatebankequipment = require ('./routers/updateinstalledequipment');
const report = require ('./routers/reportroute');
//app.use = express;
app.use('/',index);
app.use('/API/systel/report',report);
app.use('/API/systel/bankinfo',bankinfo);
app.use('/installedequip',bankequipment);
app.use('/API/systel/updateinstalledequip',updatebankequipment);


app.use('/API/systel/bankinfo',(req,res,next)=>{
    res.render('bankinfo');
})
/*app.use('/installedequip',(req,res,next)=>{
    res.render('installedequipment');
})*/


// Start the server on port 3000
const port = 3000;
const server = app.listen(port, listening);
function listening() {
    console.log(`server started on port: ${port}`);
};
