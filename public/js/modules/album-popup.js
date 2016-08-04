'use strict';
var Handlebars = require('handlebars');
// var $ =  require('jquery');

function init() {
  _setUpListners();
};

function _setUpListners() {
  $('#add_album').on('click', _showModalAdd);
  $('.edit-albums').on('click', _showModalEdit);
  $('.get-albums').on('click', _showAlbums);
  $('.modal__add-album').on('click','#btn_close_modal', _closeModal);
  $('.modal__add-album').on('click','#btn_cancel_modal', _closeModal);
  $('.modal__add-album').on('change', '#upload_bg' ,  _previewFileBg);

  $('modal__add-album').on('submit','#popup__add_album', subform);
};


var subform = function(e) {
  e.preventDefault();
  var form = $('#popup__add_album');

 $(form).ajaxSubmit({
    error: function(xhr) {
      console.log(xhr);
    },
    success: function(response) {
    console.log(response);
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
  $('.modal__add-album').removeClass('close');
  var deff = _showTemplate('templates/add-albums.hbs');
  deff.then(function(template) {
    $('.modal__add-album').html(template({
      modal_title: 'Добавить альбом',
      user_name: $('.author__name').text(),
      user_about: $('.author__about').text(),
      type_modal: 'add'
    }));
  });
};

var _showModalEdit = function(e) {
  e.preventDefault();
  var thisAlbum = $(e.target).closest('.albums_item'),
    album_name = thisAlbum.find('.albums_desc').text(),
    album_desc = thisAlbum.find('img').attr('alt'),
    album_img = thisAlbum.find('img').attr('src'),
    album_id = thisAlbum.find('.edit-albums').data('album-id');
    album_id = album_id.replace('"', '').replace('"', '');
  $('.modal__add-album').removeClass('close');
  var deff = _showTemplate('templates/add-albums.hbs');
  deff.then(function(template) {
    $('.modal__add-album').html(template({
      modal_title: 'Редактировать альбом',
      album_name: album_name,
      album_desc: album_desc,
      album_img: album_img,
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