'use strict';
var Handlebars = require('handlebars');
// var $ =  require('jquery');

function init() {
  _setUpListners();
};

function _setUpListners() {
  $('#add_photo').on('click', _showModalAdd);
  $('#edit_album_header').on('click', _showModalEditAlbum );

  $('.edit-photo').on('click', _showModalEdit);
  $('.get-albums').on('click', _showAlbums);
  $('.modal__add-album').on('click','#btn_close_modal', _closeModal);
  $('.modal__add-album').on('click','#btn_cancel_modal', _closeModal);
  $('.modal__add-album').on('change', '#upload_bg' ,  _previewFileBg);

  $('.modal__add-album').on('submit','#popup__add_photo', subform);
  $('.modal__add-album').on('click', '#del_photo', delphoto);
};

var current_photo_id;

var delphoto = function(e) {
  e.preventDefault();
  $.ajax({
    url: '/main/album/delphoto',
    type: 'POST',
    data: {photo_id: current_photo_id},
  })
  .done(function() {
    window.location.href = '/main/album';
    $('.modal__add-album').addClass('close').empty();
  })
};

var subform = function(e) {
  e.preventDefault();
  var form = $('#popup__add_photo');

 $(form).ajaxSubmit({
    error: function(xhr) {
      console.log(xhr);
    },
    success: function(response) {
    window.location.href = '/main/album';
    }
  });
   $('.modal__add-album').addClass('close').empty();
};


var _closeModal = function(e) {
  e.preventDefault();
  $('.modal__add-album').addClass('close').empty();
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


var _showModalAdd = function(e) {
  e.preventDefault();
  var album_id = $('#add_photo').data('id-album');
  album_id = album_id.replace('"', '').replace('"', '');

  $('.modal__add-album').removeClass('close');
  var deff = _showTemplate('../templates/add-photo.hbs');
  deff.then(function(template) {
    $('.modal__add-album').html(template({
      modal_title: 'Добавить фотографию',
      user_name: $('.author__name').text(),
      user_about: $('.author__about').text(),
      type_modal: 'add',
      album_img: '/img/no_photo.jpg',
      add_photo: 'add_photo',
      album_id: album_id
    }));
  });
};

var _showModalEdit = function(e) {
  e.preventDefault();
  var thisAlbum = $(e.target).closest('.albums_item'),
    photo_name = thisAlbum.find('.albums_desc').text(),
    photo_desc = thisAlbum.find('img').attr('alt'),
    photo_img = thisAlbum.find('img').attr('src'),
    photo_id = thisAlbum.find('.edit-photo').data('id-photo');
    photo_id = photo_id.replace('"', '').replace('"', '');
    current_photo_id = photo_id;
  $('.modal__add-album').removeClass('close');
  var deff = _showTemplate('../templates/add-photo.hbs');
  deff.then(function(template) {
    $('.modal__add-album').html(template({
      modal_title: 'Редактировать фотографию',
      photo_name: photo_name,
      photo_desc: photo_desc,
      photo_img: photo_img,
      type_modal: 'edit',
      edit_photo: 'edit_photo',
      photo_id: photo_id
    }));
  });
};

var _showModalEditAlbum = function(e) {
  e.preventDefault();
  var thisAlbum = $('.album__information-container'),
    album_name = thisAlbum.find('.album__name').text(),
    album_desc = thisAlbum.find('.album__desc').text(),
    bg = $('.header__cover').css('background-image'),
    album_id = $('#edit_album_header').data('id-album');

    bg = bg.replace('url("', '').replace('")', '');
    album_id = album_id.replace('"', '').replace('"', '');

  $('.modal__add-album').removeClass('close');
  var deff = _showTemplate('../templates/add-albums.hbs');
  deff.then(function(template) {
    $('.modal__add-album').html(template({
      modal_title: 'Редактировать альбом',
      album_name: album_name,
      album_desc: album_desc,
      album_img: bg,
      type_modal: 'edit',
      album_id: album_id
    }));
  });
};

var _previewFileBg = function () {
  var preview = $('.modal__img-bg')[0];
  var file    = $("#upload_bg")[0].files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
};

var _showAlbums = function(e) {
  // e.preventDefault();
  var thisAlbum = $(e.target).closest('.albums_item'),
    album_id = thisAlbum.find('.edit-albums').data('album-id');
    album_id = album_id.replace('"', '').replace('"', '');
  $.ajax({
    url: '/main/album',
    type: 'post',
    data: {album_id: album_id},
  })  
};


module.exports = {
  init: init
};