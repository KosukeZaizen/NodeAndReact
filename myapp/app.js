console.log("hello");

//htmlsフォルダ削除
var rimraf = require('rimraf');
rimraf("views", function (err) {
    if(err){
        console.error(err);
        process.exit(1);
    }else{
        console.log('views folder removed!');

        //viewsフォルダをコピーして、新たなhtmlsフォルダを作成
        var fsExtra = require('fs-extra');
        fsExtra.copy('htmls', 'views', {
            clobber: true,
            dereference: false,
            filter: function (element) {
                return true;
            },
            preserveTimestamps: false
        }, function (err) {
          if(err){
            console.error(err);
            process.exit(1);
          }else{
            console.log('views folder was recreated!');

             //viewsフォルダ内の.ejsファイルの拡張子を.htmlに変換
             let fs = require('fs');
             fs.readdir('./views', function(err, files){
               if (err) throw err;
               console.log("change from " + files);
               for(let htmlFile of files){
                   var oldPath = './views/' + htmlFile;
                   var newPath = './views/' + htmlFile.replace(".html", ".ejs");
                   fs.rename(oldPath, newPath, function (err) {
                     if (err) throw err
                     console.log(oldPath + ':  Successfully renamed - AKA moved!')
                   })
               }
             });
          }
      });
    }
});


//サーバー起動
var express = require('express'),
  app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render("index");
});

app.get('/:name', function (req, res) {
  if(false){
    res.render(req.params.name);
  }else{
    res.render("error", {error: "The page [" + req.params.name + "] is not exist in this website."});
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


