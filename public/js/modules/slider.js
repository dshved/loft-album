'use strict';
var Handlebars = require('handlebars');

function init() {
  _setUpListners();
};

function _setUpListners() {
  $('.photo__link').on('click', _showModal);

  $('.modal__slider').on('click', '#btn_close_modal', _closeModal);
  $('.modal__slider').on('click', '#next_slide', _nextSlide);
  $('.modal__slider').on('click', '#prev_slide', _prevSlide);
};

var _closeModal = function(e) {
  e.preventDefault();
  $('.modal__slider').addClass('close').empty();
};


var _showTemplate = function(path) {
  var d = $.Deferred(),
    template;

  $.ajax({
    url: path,
    success: function(data) {
      template = Handlebars.compile(data);
      d.resolve(template);
    }
  });

  return d.promise();
};


var _showModal = function(e) {
  e.preventDefault();
  var imgSrc = $(e.target).attr('src');
  var deff = _showTemplate('../templates/slider.hbs');

  $('.modal__slider').removeClass('close');
  deff.then(function(template) {
    $('.modal__slider').html(template({
      this_img: imgSrc
    }));
  });
};

var count = 0;

var _nextImage = function() {
  count++;
  var photoList = $('.slider_list');
  var images = photoList.find('.photo__image');  
  var currentImg = count;
  if (count >= images.length) {
    count = 0;
    currentImg = count;
    return $(images[currentImg]).attr('src');
  } else {    
    return $(images[currentImg]).attr('src');
  };
};
var _prevImage = function() {
  count--;
  var photoList = $('.slider_list');
  var images = photoList.find('.photo__image');  
  var currentImg = count;
  if (count < 0) {
    count = images.length-1;
    currentImg = count;
    return $(images[currentImg]).attr('src');
  } else {    
    console.log(count);
    return $(images[currentImg]).attr('src');
  };
};

var _nextSlide = function(e) {
  e.preventDefault();
  $('.slide').attr('src', _nextImage());
};

var _prevSlide = function(e) {
  e.preventDefault();
  $('.slide').attr('src', _prevImage());
};

module.exports = {
  init: init
};
