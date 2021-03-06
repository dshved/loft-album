var express = require('express'),
  multiparty = require('multiparty'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article'),
  Photo = mongoose.model('Photo'),
  Album = mongoose.model('Album');

var async = require('async');

module.exports = function(app) {
  app.use('/', router);
};

function requireLogin(req, res, next) {
  if (!req.session.user_id) {
    res.redirect('/');
    res.end();
  } else {
    next();
  }
};

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/main', requireLogin, function(req, res, next) {
  var data = {};

  async.parallel([
    function(cb) {
      Photo.find({}, null, { sort: { _id: -1 } }, function(err, photos) {
        if (photos.length > 0) {
          data['photos'] = photos;
        };
        cb();
      });
    },
    function(cb) {
      Album.find({ 'owner': req.session.user_id }, function(err, albums) {
        if (albums.length > 0) {
          data['albums'] = albums;
        };
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
    res.render('common/_main_page', data);
    res.end();
  });
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.send('ok');
});