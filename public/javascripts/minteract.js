$(function () {
  $(window).scroll(function () {
    scroll_start = $(window).scrollTop();
    var startchange = $('.secondmain');
    var offset = startchange.offset();
    if (scroll_start < offset.top - 650) { // top 
      $('#ologo').attr('src', '/images/wl.png');
      $('.mainnav').css('height', '80px');
      $('.mainnav a').css('padding', '28px 20px');
      $('ul').css('height', '80px');
      $('.site-logo').css('padding', '11px');
      $('a.logo').css('padding', '0px');
      $('header').removeClass('fixedheader').addClass('absoluteheader').fadeIn();
    } else if (scroll_start > offset.top - 650 && scroll_start < offset.top - 250){
      $('header').fadeOut();
    } else { // bottom
      $('#ologo').attr('src', '/images/vl.png');
      $('.mainnav').css('height', '60px');
      $('.mainnav a').css('padding', '18px 20px');
      $('ul').css('height', '60px');
      $('.site-logo').css('padding', '0px');
      $('a.logo').css('padding', '0px');
      $('header').removeClass('absoluteheader').addClass('fixedheader').fadeIn();
    }
    
  });
});
