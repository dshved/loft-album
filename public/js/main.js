$('.login__form').addClass('load');
$('.login__title').addClass('load-title');

require('./modules/test');
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

var Flip = (function() {
  function init() {
    _setUpListners();
  };

  function _setUpListners() {
    $('#auth-btn').on('click', _formFlip);
    $('#signin-btn').on('click', _formFlip);
  };

  var _formFlip = function(e){
    e.preventDefault();
    var flip = $('.flip');
    flip.toggleClass('flipping');
  };

  return {
    init: init
  };

})();

Flip.init();
