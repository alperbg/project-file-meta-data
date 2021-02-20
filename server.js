var express = require('express');
var cors = require('cors');
var multer = require('multer');

require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


const upload = multer();

//Upload route
app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  try {
    return res.status(201).json({
      message: 'File uploded successfully',
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  } catch (error) {
    console.error(error);
  }
});


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});