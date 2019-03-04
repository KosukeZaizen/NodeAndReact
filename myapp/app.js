//サーバー起動
let express = require('express');
let app = express();
let favicon = require('serve-favicon');
let path = require('path');



//ファビコンの指定
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));


//ejs格納フォルダ[views]の設定
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//viewsフォルダー内のファイル名リスト
let views = [];
console.log("initiate views");
console.log("views: " + views);


//------------------------------------------------------------
//　ファビコンリクエストの場合
//------------------------------------------------------------
/*
app.get('/favicon.ico', function (req, res) {
  console.log("");
  console.log("favicon request!");
  res.writeHead(200, {'Content-Type': 'image/x-icon'} );
  res.end();
});
*/


//------------------------------------------------------------
//　httpの場合、httpsにリダイレクト
//------------------------------------------------------------
app.get('*', function (req,res,next) {
  console.log("");
  console.log("redirect check.");
  console.log("client IP: " + getIP(req));
  if(req.headers['x-forwarded-proto']!='https'){
    console.log("redirect to https://" + req.headers.host + req.url);
    res.redirect("https://" + req.headers.host + req.url);
  } else {
    console.log("no need to redirect");
    next(); /* Continue to other routes if we're not redirecting */
  }
})


//------------------------------------------------------------
//　トップページ リクエスト時
//------------------------------------------------------------
app.get('/', function (req, res) {
  dispIndex(req, res);
});
app.get('/index', function (req, res) {
  dispIndex(req, res);
});
function dispIndex(req, res){
  console.log("");
  console.log("--dispIndex start");
  console.log("client IP: " + getIP(req));
  getViewsAndRender(req, res, "index", {arrPaths: views});
}


//------------------------------------------------------------
//　各ページ リクエスト時
//------------------------------------------------------------
app.get('/:name', function (req, res) {
  console.log("");
  console.log("--get /:name");
  console.log("client IP: " + getIP(req));
  getViewsAndRender(req, res, req.params.name, null);
});


//------------------------------------------------------------
//　viewsフォルダ内のファイル名がnode側で既に読み込まれていれば、
//　それを引数に描画。
//　読み込まれていなければ、読み込んでから描画。
//------------------------------------------------------------
function getViewsAndRender(req, res, strPageName, obj){
  console.log("--getViewsAndRender() start");
  console.log("client IP: " + getIP(req));

  if(views.length == 0){
    //viewsフォルダー内のファイルパスを取得
    fs.readdir('./views', function(err, files){
      if (err) throw err;
      console.log("files :" + files);
      views = [];
      for(let ejsFile of files){
        console.log(ejsFile);
        let file = ejsFile.replace(".ejs", "");
        views.push(file);
      }
      console.log("file path imported -- " + views);
      doRender(req, res, strPageName, {arrPaths: views});
    });
  } else {
    console.log("render without get views because views are already: " + views);
    doRender(req, res, strPageName, {arrPaths: views});
  }
}


//------------------------------------------------------------
//　画面描画
//------------------------------------------------------------
function doRender(req, res, strPageName, obj){
  if(views.indexOf(strPageName) > -1){
    if(obj){
      console.log("res.render(" + strPageName + ", " + obj + ")");
      res.render(strPageName, obj);
    } else {
      console.log("res.render(" + strPageName + ")");
      res.render(strPageName);
    }
  } else {
    console.log("res.render(error)");
    res.render("error", {error: "The page [" + req.params.name + "] is not exist in this website."});
  }
}


//------------------------------------------------------------
//　IPアドレス取得
//------------------------------------------------------------
function getIP(req) {
  if (req.headers['x-forwarded-for']) {
    return req.headers['x-forwarded-for'];
  }
  if (req.connection && req.connection.remoteAddress) {
    return req.connection.remoteAddress;
  }
  if (req.connection.socket && req.connection.socket.remoteAddress) {
    return req.connection.socket.remoteAddress;
  }
  if (req.socket && req.socket.remoteAddress) {
    return req.socket.remoteAddress;
  }
  return '0.0.0.0';
};


//------------------------------------------------------------
//　Webサーバー起動
//------------------------------------------------------------
app.listen(80, function () {
  console.log('Example app listening on port 80!');
});

