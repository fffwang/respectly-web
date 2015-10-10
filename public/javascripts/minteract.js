$(document).ready(function () {
  $(document).scroll(function () {
    scroll_start = $(this).scrollTop();
    var startchange = $('.secondmain');
    var offset = startchange.offset();


    if (scroll_start > offset.top - 140) {
      $('#ologo').attr('src', '/images/vl.png');
      $('header').css('background-color', '#B1C5FF');
      $('header').css('position', 'fixed');
      $('header').css('opacity', '0.9');
    } else {
      $('#ologo').attr('src', '/images/wl.png');
      $('header').css('background-color', 'transparent');
      $('header').css('position', 'absolute');
      $('header').css('opacity', '1');

    }
  });
});
