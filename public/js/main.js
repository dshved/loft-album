$('.login__form').addClass('load');
$('.login__title').addClass('load-title');

 $("#auth-btn").click(function(e) {
        e.preventDefault();
        $('.login__form').removeClass('load');
        $('.login__title').removeClass('load-title');
        $('.registration__form').addClass('load');
        $('.registration__title').addClass('load-title');
});

 $("#signin-btn").click(function(e) {
        e.preventDefault();
        $('.login__form').addClass('load');
        $('.login__title').addClass('load-title');
        $('.registration__form').removeClass('load');
        $('.registration__title').removeClass('load-title');
});