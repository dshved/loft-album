var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Photo = mongoose.model('Photo'),
  Album = mongoose.model('Album');

var async = require('async');

module.exports = function(app) {
  app.use('/main', router);
};

var album_id;
router.post('/album', function(req, res, next) {
  album_id = req.body.album_id;
  res.end();
});

router.get('/album', function(req, res, next) {
  var data = {};
  if (album_id) {
    async.parallel([
      function(cb) {
        Photo.find({ 'album': album_id }, null, { sort: { _id: -1 } }, function(err, photos) {
          if (photos.length > 0) {
            data['photos'] = photos;
          };
          cb();
        });
      },
      function(cb) {
        Album.findOne({ _id: album_id }, function(err, albums) {
          if (err) return next(err);
          data['albums'] = albums;
          cb();
        });
      },
      function(cb) {
        User.findOne({ _id: req.session.user_id }, function(err, user) {
          if (err) return next(err);
          data['user'] = user;
          cb();
        });
      },
    ], function(err) {
      if (err) return next(err);
      res.render('common/_album_page', data);
      res.end();
    });
  } else {
    res.redirect('/main');
    res.end;
  }
});
