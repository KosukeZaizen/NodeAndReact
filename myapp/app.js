var express = require('express');
var app = express();

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render("index");
});

app.get('/test', function (req, res) {
  res.send('Hello test!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})


/*
function read(filePath) {
  var fs = require('fs');
  var content = new String();
  content = fs.readFileSync(filePath, 'utf8');
  console.log("content:" + content);
  return content;
};
*/
