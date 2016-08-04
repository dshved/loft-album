var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'loft-album'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://loft:test@ds029051.mlab.com:29051/loft'
  },

  test: {
    root: rootPath,
    app: {
      name: 'loft-album'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://loft:test@ds029051.mlab.com:29051/loft'
  },

  production: {
    root: rootPath,
    app: {
      name: 'loft-album'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://loft:test@ds029051.mlab.com:29051/loft'
  }
};

module.exports = config[env];
