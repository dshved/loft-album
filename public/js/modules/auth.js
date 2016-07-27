'use strict';

var Auth = (function() {

  function init() {
    _setUpListners();
  };

  function _setUpListners() {
    $('#reg_btn').on('click', _setRegistration);
    $('#login_btn').on('click', _setLogin);
    $('#forget_btn').on('click', _setForget);
  };

  var _errorMessage = function(elem, msg) {
    var m = '<div class="form__error"><span class="error_text">' + msg + '</span></div>';
    elem.before(m);
    elem.prop('disabled', true);
    setTimeout(function() {
      $('.form__error').slideUp('2000', function() {
        $('.form__error').remove();
        elem.prop('disabled', false);
      });
    }, 1000)
  };

  var _isEmail = function(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  var _replaceSpace = function(value) {
    var reg_pusto = value.replace(/[\s{2,}]+/g, ' ');
    if (reg_pusto === '' || reg_pusto === ' ') {
      return true;
    } else {
      return false;
    }

  }

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

  var _setLogin = function(e) {
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
        })
        .fail(function(data) {
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


  var _setRegistration = function(e) {
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
        })
        .fail(function(data) {
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

  var _setForget = function(e) {
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
        })
        .fail(function(data) {
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

})();

Auth.init();
