/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	$('.login__form').addClass('load');
	$('.login__title').addClass('load-title');

	var auth = __webpack_require__(2);
	__webpack_require__(3);
	console.log(auth);
	// $("#auth-btn").click(function(e) {
	//   e.preventDefault();
	//   $('.login__form').removeClass('load');
	//   $('.login__title').removeClass('load-title');
	//   $('.registration__form').addClass('load');
	//   $('.registration__title').addClass('load-title');
	// });

	// $("#signin-btn").click(function(e) {
	//   e.preventDefault();
	//   $('.login__form').addClass('load');
	//   $('.login__title').addClass('load-title');
	//   $('.registration__form').removeClass('load');
	//   $('.registration__title').removeClass('load-title');
	// });

	// var flip = document.getElementsByClassName('flip');
	// var elem = flip[0];
	// elem.addEventListener('click', function(e) {
	//   elem.classList.toggle('flipping');
	// });

	// $('.auth-btn').click(function(e) {
	//   e.preventDefault();

	// });

	var Flip = function () {
	  function init() {
	    _setUpListners();
	  };

	  function _setUpListners() {
	    $('#auth-btn').on('click', _formFlip);
	    $('#signin-btn').on('click', _formFlip);
	  };

	  var _formFlip = function _formFlip(e) {
	    e.preventDefault();
	    var flip = $('.flip');
	    flip.toggleClass('flipping');
	  };

	  return {
	    init: init
	  };
	}();

	Flip.init();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var Auth = function () {

	  function init() {
	    _setUpListners();
	  };

	  function _setUpListners() {
	    $('#reg_btn').on('click', _setRegistration);
	    $('#login_btn').on('click', _setLogin);
	    $('#forget_btn').on('click', _setForget);
	  };

	  var _errorMessage = function _errorMessage(elem, msg) {
	    var m = '<div class="form__error"><span class="error_text">' + msg + '</span></div>';
	    elem.before(m);
	    elem.prop('disabled', true);
	    setTimeout(function () {
	      $('.form__error').slideUp('2000', function () {
	        $('.form__error').remove();
	        elem.prop('disabled', false);
	      });
	    }, 1000);
	  };

	  var _isEmail = function _isEmail(email) {
	    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	    return regex.test(email);
	  };

	  var _replaceSpace = function _replaceSpace(value) {
	    var reg_pusto = value.replace(/[\s{2,}]+/g, ' ');
	    if (reg_pusto === '' || reg_pusto === ' ') {
	      return true;
	    } else {
	      return false;
	    }
	  };

	  function _validateRegistrationForm() {
	    var $this = $(this),
	        form = $('#registration__form'),
	        name = form.find('#registration_name'),
	        email = form.find('#registration_mail'),
	        password = form.find('#registration_password'),
	        obj = {};

	    var validEmail = _isEmail(email.val());

	    if (_replaceSpace(name.val()) || _replaceSpace(email.val()) || _replaceSpace(password.val())) {
	      obj.valid = false;
	      obj.message = "Вы заполнили не все поля";
	      return obj;
	    }
	    if (!validEmail) {
	      obj.valid = false;
	      obj.message = "Введите корректный Email";
	      return obj;
	    }
	    if (password.val().length < 8) {
	      obj.valid = false;
	      obj.message = "Пароль должен быть больше 8 символов";
	      return obj;
	    }

	    return true;
	  }

	  function _validateLoginForm() {
	    var $this = $(this),
	        form = $('#login__form'),
	        email = form.find('#login_mail'),
	        password = form.find('#login__password'),
	        obj = {};

	    var validEmail = _isEmail(email.val());

	    if (_replaceSpace(email.val()) || _replaceSpace(password.val())) {
	      obj.valid = false;
	      obj.message = "Вы заполнили не все поля";
	      return obj;
	    }
	    if (!validEmail) {
	      obj.valid = false;
	      obj.message = "Введите корректный Email";
	      return obj;
	    }

	    return true;
	  }

	  function _validateForgetForm() {
	    var $this = $(this),
	        form = $('#forget__login'),
	        email = form.find('#forget_mail'),
	        obj = {};

	    var validEmail = _isEmail(email.val());

	    if (_replaceSpace(email.val())) {
	      obj.valid = false;
	      obj.message = "Вы заполнили не все поля";
	      return obj;
	    }
	    if (!validEmail) {
	      obj.valid = false;
	      obj.message = "Введите корректный Email";
	      return obj;
	    }

	    return true;
	  }

	  var _setLogin = function _setLogin(e) {
	    e.preventDefault();
	    var $this = $(this),
	        form = $('#login__form'),
	        data = form.serialize(),

	    // dataArray = form.serializeArray(),
	    // email = dataArray[0].value,
	    result = _validateLoginForm();
	    if (result === true) {
	      $.ajax({
	        url: '/auth',
	        type: 'POST',
	        dataType: 'json',
	        data: data
	      }).fail(function (data) {
	        var statusCode = data.status;
	        if (statusCode == 200) {

	          localStorage.setItem('token', data.responseText);
	          form[0].reset();
	          window.location.href = '/';
	        } else if (statusCode > 200) {
	          _errorMessage($this, data.responseText);
	        }
	      });
	    } else {
	      _errorMessage($this, result['message']);
	    }
	  };

	  var _setRegistration = function _setRegistration(e) {
	    e.preventDefault();

	    var $this = $(this),
	        form = $('#registration__form'),
	        data = form.serialize(),
	        result = _validateRegistrationForm();

	    if (result === true) {
	      $.ajax({
	        url: '/registration',
	        type: 'POST',
	        dataType: 'json',
	        data: data
	      }).fail(function (data) {
	        var statusCode = data.status;
	        if (statusCode == 200) {
	          _errorMessage($this, data.responseText);
	          form[0].reset();
	        } else if (statusCode > 200) {
	          _errorMessage($this, data.responseText);
	        }
	      });
	    } else {
	      _errorMessage($this, result['message']);
	    }
	  };

	  var _setForget = function _setForget(e) {
	    e.preventDefault();

	    var $this = $(this),
	        form = $('#forget__login'),
	        data = form.serialize(),
	        result = _validateForgetForm();

	    if (result === true) {
	      $.ajax({
	        url: '/forget',
	        type: 'POST',
	        dataType: 'json',
	        data: data
	      }).fail(function (data) {
	        var statusCode = data.status;
	        if (statusCode == 200) {
	          window.location.href = '/';
	        } else if (statusCode > 200) {
	          _errorMessage($this, data.responseText);
	        }
	      });
	    } else {
	      _errorMessage($this, result['message']);
	    };
	  };

	  return {
	    init: init
	  };
	}();

	Auth.init();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	console.log('hi, i am a module');

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map