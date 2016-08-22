var express = require('express'),
  multiparty = require('multiparty'),
  util = require('util'),
  fs = require('fs'),
  jwt = require('jsonwebtoken'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Album = mongoose.model('Album'),
  Photo = mongoose.model('Photo');

module.exports = function(app) {
  app.use('/main/album', router);
};

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
};

router.post('/addphoto', function(req, res, next) {
  var description,
    title,
    filePath,
    type,
    photo_id,
    album_id,
    user_id = req.session.user_id;

  var form = new multiparty.Form();

  form.parse(req, function(err, fields, files) {

    type = fields.type_modal[0];
    description = fields.photo_description[0];
    title = fields.photo_name[0];

    if (type === 'add') {
      if (!isEmptyObject(files)) {
        album_id = fields.album_id;
        filePath = files.upload_bg[0].path;
        fileSize = files.upload_bg[0].size;
        fs.readFile(filePath, function(err, data) {
          var radom = Math.random().toString(36);
          var randomName = radom.substring(2, radom.length);
          var path = './public/upload/' + randomName + '-' + files.upload_bg[0].originalFilename;
          fs.writeFile(path, data, function(err) {
            Photo.find({}, function(err, photo) {
              if (err) return next(err);
              var newPhoto = new Photo({
                album: album_id,
                description: description,
                title: title,
                file: '/upload/' + randomName + '-' + files.upload_bg[0].originalFilename
              });
              newPhoto.save();
              res.redirect('/main/album');
              res.end();
            });
          });

        });
      } else {
        res.redirect('/main/album');
        res.end();
      }
    };
    if (type === 'edit') {
      photo_id = fields.photo_id[0];
      Photo.findById({ _id: photo_id }, function(err, photo) {
        if (err) return handleError(err);
        photo.title = title;
        photo.description = description;
        photo.save(function(err) {
          if (err) return handleError(err);
          res.redirect('/main/album');
          res.end();
        });
      });
    };
  });
});

router.post('/delphoto', function(req, res, next) {
  var photo_id = req.body.photo_id;
  Photo.findByIdAndRemove(photo_id, function(err) {
    if (err) return next(err);
    res.redirect('/main/album');
    res.end();
  });
});
