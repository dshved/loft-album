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
  app.use('/', router);
};

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
};

router.post('/delalbum', function(req, res, next) {
  var album_id = req.body.album_id;

  Photo.find({ album: album_id }).remove().exec(function(err, data) {
    Album.findByIdAndRemove(album_id, function(err) {
      if (err) return next(err);
      res.redirect('/main');
      res.end();
    });
  });
});


router.post('/addalbum', function(req, res, next) {
  var description,
    title,
    filePath,
    fileSize,
    type,
    album_id,
    user_id = req.session.user_id;

  var form = new multiparty.Form();

  form.parse(req, function(err, fields, files) {
    type = fields.type_modal[0];
    description = fields.album_description[0];
    title = fields.album_name[0];
    if (!isEmptyObject(files)) {
      filePath = files.upload_bg[0].path;
      fileSize = files.upload_bg[0].size;

      if (type === 'add') {

        fs.readFile(filePath, function(err, data) {
          var radom = Math.random().toString(36);
          var randomName = radom.substring(2, radom.length);
          var path = './public/upload/' + randomName + '-' + files.upload_bg[0].originalFilename;
          fs.writeFile(path, data, function(err) {
            Album.find({}, function(err, albums) {
              if (err) return next(err);

              var newAlbum = new Album({
                owner: user_id,
                title: title,
                description: description,
                cover: '/upload/' + randomName + '-' + files.upload_bg[0].originalFilename
              });

              newAlbum.save(function(err, album) {
                var newPhoto = new Photo({
                  album: album.id,
                  file: '/upload/' + randomName + '-' + files.upload_bg[0].originalFilename
                });
                newPhoto.save();
              });

              res.redirect('/main');
              res.end();
            });
          });

        });
      };
      if (type === 'edit') {
        album_id = fields.album_id[0];
        Album.findById({ _id: album_id }, function(err, albums) {
          if (err) return handleError(err);

          albums.title = title;
          albums.description = description;

          if (fileSize !== 0) {
            fs.readFile(filePath, function(err, data) {
              var radom = Math.random().toString(36);
              var randomName = radom.substring(2, radom.length);
              var path = './public/upload/' + randomName + '-' + files.upload_bg[0].originalFilename;

              fs.writeFile(path, data, function(err) {
                albums.cover = '/upload/' + randomName + '-' + files.upload_bg[0].originalFilename
                albums.save(function(err) {
                  if (err) return handleError(err);
                  res.redirect('/main');
                  res.end();
                });
              });
            });
          } else {
            albums.save(function(err) {
              if (err) return handleError(err);
              res.redirect('/main');
              res.end();
            });
          }
        });
      };
    } else {
      album_id = fields.album_id[0];
        Album.findById({ _id: album_id }, function(err, albums) {
          albums.title = title;
          albums.description = description;
          albums.save(function(err) {
              if (err) return handleError(err);
              res.redirect('/main');
              res.end();
            });
        });
    };
  });
});
