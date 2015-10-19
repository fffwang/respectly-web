$(document).ready(function () {
  $(document).scroll(function () {
    scroll_start = $(this).scrollTop();
    var startchange = $('.secondmain');
    var offset = startchange.offset();

    if (scroll_start > offset.top - 250) {
      $('#ologo').attr('src', '/images/vl.png');
      $('header').css('background-color', '#03ae6d');
      $('header').css('background-image', 'linear-gradient(to left, #07b15f 0, #00ac92 50%, #00849e 100%)');
      $('header').css('position', 'fixed');
      $('header').css('opacity', '0.8');

      $('header').css('height', '60px');
      $('.mainnav').css('height', '60px');
      $('.mainnav a').css('padding', '18px 20px');
      $('ul').css('height', '60px');
      $('.site-logo').css('padding', '0px');
      $('a.logo').css('padding', '0px');

    } else {
      $('#ologo').attr('src', '/images/wl.png');
      $('header').css('background-color', 'transparent');
      $('header').css('background-image', 'none');
      $('header').css('position', 'absolute');
      $('header').css('opacity', '1');

      $('header').css('height', '80px');
      $('.mainnav').css('height', '80px');
      $('.mainnav a').css('padding', '28px 20px');
      $('ul').css('height', '80px');
      $('.site-logo').css('padding', '11px');
      $('a.logo').css('padding', '0px');
    }
  });
});
