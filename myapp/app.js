var express = require('express');
var app = express();



app.get('/', function (req, res) {
  res.send(read("pages/index.txt"));
});

app.get('/test', function (req, res) {
  res.send('Hello test!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})

function read(filePath) {
  var fs = require('fs');
  var content = new String();
  content = fs.readFileSync(filePath, 'utf8');
  console.log("content:" + content);
  return content;
};
