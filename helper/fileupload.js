const multer = require('multer');
const path = require('path');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //define file local path
        cb(null, 'public/files/switch')
    },
    filename: function (req, file, cb) {
      //console.log(file)
      cb(null, file.originalname.replace(/\.[^.]*$/,'') + '-' + Date.now() + path.extname(file.originalname));
      //below comment show how to store images with the same file name
      //cb(null, file.originalname);
  
    }
  })

//define file filter
/*const filefilter = (req, file, cb) => {
    if (file.mimetype == 'text/plain')
    {
        cb(null, true);
    }
    else{
        cb(new Error ('please upload text file'),false);
    }

}*/

//define upload
const upload = multer (
    {
        storage: storage,
        limits: {
            fileSize: 1024*1024*10
        }
        //fileFilter: filefilter
    }
);

module.exports = upload