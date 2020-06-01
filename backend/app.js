var express = require ('express')
var mongoose = require ('mongoose')
var cors = require('cors');
var bodyParser = require('body-parser');
var logger = require('morgan');
var dotenv= require('dotenv');
var config = require('./config');
var multer = require('multer');
var path = require('path');
var fileDir = require("path").join(__dirname, "/backend");
dotenv.config();
var app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(express.static(fileDir));

mongoose.connect('mongodb://localhost/product', {useNewUrlParser: true}, ()=>
  console.log("connected to db"));
mongoose.connection.on('error', function(err) {
  console.log('Error: Could not connect to MongoDB.');
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null,'.././public/uploads')
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
})

const upload = multer({
  storage: storage,
  fileFilter : function(req, file, cb){
    checkFileType(file,cb)
  }
})

function checkFileType(file,cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only');
  }
}

app.post('/upload', upload.single('file'), async(req, res, next) => {
  const file = req.file;
  if(!file) {
    const error = new Error('Please upload a file');
    return next(error);
  }
  if(file){
    res.send(req.file);
  }
});

require('./routes')(app);

app.listen(3001, () => {
  console.log('Server started!')
})
