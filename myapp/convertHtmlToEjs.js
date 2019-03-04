/*
htmls�t�H���_�̒��g��views�t�H���_�Ɉړ����A
ejs�ɕϊ�
*/

function convertHtmlToEjs(){

  //htmls�t�H���_�폜
  let rimraf = require('rimraf');
  let fs = require('fs');

  rimraf("views", function (err) {
      if(err){
          console.error(err);
          process.exit(1);
      }else{
          console.log('views folder removed!');

          //views�t�H���_���R�s�[���āA�V����htmls�t�H���_���쐬
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

               //views�t�H���_����.ejs�t�@�C���̊g���q��.html�ɕϊ�
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