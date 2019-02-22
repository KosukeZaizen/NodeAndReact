//htmlsフォルダ削除
let rimraf = require('rimraf');
let fs = require('fs');

rimraf("views", function (err) {
    if(err){
        console.error(err);
        process.exit(1);
    }else{
        console.log('views folder removed!');

        //viewsフォルダをコピーして、新たなhtmlsフォルダを作成
        let fsExtra = require('fs-extra');
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
             fs.readdir('./views', function(err, files){
               if (err) throw err;
               console.log("change from " + files);
               for(let htmlFile of files){
                   let oldPath = './views/' + htmlFile;
                   let newPath = './views/' + htmlFile.replace(".html", ".ejs");
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
let express = require('express'),
  app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//viewsフォルダー内のファイル名リスト
let views = [];

//トップページ表示
app.get('/', function (req, res) {
  dispIndex(req, res);
});
app.get('/index', function (req, res) {
  dispIndex(req, res);
});
function dispIndex(req, res){
  //viewsフォルダー内のファイルパスを取得
  fs.readdir('./views', function(err, files){
    if (err) throw err;
    console.log("files :" + files);
    views = [];
    for(let htmlFile of files){
      let ejsFile = htmlFile.replace(".ejs", "");
      views.push(ejsFile);
    }
    console.log(views);
    res.render("index", {arrPaths: views});
  });
}


//各ページ表示
app.get('/:name', function (req, res) {
  if(views.indexOf(req.params.name) > -1){
    res.render(req.params.name);
  }else{
    res.render("error", {error: "The page [" + req.params.name + "] is not exist in this website."});
  }
});


//Webサーバー起動
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

