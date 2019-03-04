/*
htmlsフォルダの中身をviewsフォルダに移動し、
ejsに変換
*/

function convertHtmlToEjs(){

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
}
convertHtmlToEjs();