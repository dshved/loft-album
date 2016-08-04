var express = require('express'),
  util = require('util'),
  multiparty = require('multiparty'),
  router = express.Router(),
  fs = require('fs'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function(app) {
  app.use('/', router);
};

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

router.post('/profile', function(req, res, next) {

  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    User.findOne({ _id: req.session.user_id }, function(err, user) {
      if (err) return next(err);
      var description = fields.user_about[0],
        name = fields.user_name[0];
      old_ava = user.avatar;
      if (!isEmptyObject(files)) {

        var ava = files.upload_ava;
        var bg = files.upload_bg;
        if (ava) {
          fs.readFile(ava[0].path, function(err, data) {
            var radom_ava = Math.random().toString(36);
            var randomName_ava = radom_ava.substring(2, radom_ava.length);
            var path_ava = './public/upload/' + randomName_ava + '-' + ava[0].originalFilename;
            fs.writeFile(path_ava, data, function(err) {
              if (name) user.name = name;
              user.description = description;
              user.avatar = '/upload/' + randomName_ava + '-' + ava[0].originalFilename;
              user.save();
              // fs.unlink('./public/' + old_ava, function(err) {
              //   if (err) throw err;
              //   console.log("file deleted");
              // });
            });

          });


        } else {
          console.log('нет');
          // res.end();
        }
        if (bg) {
          fs.readFile(bg[0].path, function(err, data) {
            var radom = Math.random().toString(36);
            var randomName = radom.substring(2, radom.length);
            var path = './public/upload/' + randomName + '-' + bg[0].originalFilename;
            fs.writeFile(path, data, function(err) {
              if (name) user.name = name;
              user.description = description;
              user.bg = '/upload/' + randomName + '-' + bg[0].originalFilename;
              user.save();
              // fs.unlink('./public/' + old_ava, function(err) {
              //   if (err) throw err;
              //   console.log("file deleted");
              // });
            });

          });

        } else {
          console.log('нет');
          // res.end();
        }
      } else {
        if (name) user.name = name;
        user.description = description;
        user.save();
        res.end();

      }
      res.end();
    });
  });
});
