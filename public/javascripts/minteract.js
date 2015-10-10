$(document).ready(function(){       
   $(document).scroll(function() { 
      scroll_start = $(this).scrollTop();
      var startchange = $('.secondmain');
      var offset = startchange.offset();

      if(scroll_start > offset.top-90) {
          $('#ologo').attr('src', '/images/nl.png');
          $('header').css('background-color', '#B1C5FF');
          $('header').css('position', 'fixed');

          $('header').animate({
            opacity : 0.8
          }, 1000);
       } else if( scroll_start < offset.top-90 && scroll_start > 100){
          $('header').css('opacity', '0');
       } else {
          $('#ologo').attr('src', '/images/wl.png');
          $('header').css('background-color', 'transparent');
          $('header').css('position', 'absolute');
          $('header').css('opacity', '1');
        
       }
   });
});