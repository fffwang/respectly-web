$(function () {
var toggleFlag = 1;
  $(window).scroll(function () {
    scroll_start = $(window).scrollTop();
    var startchange = $('.brief-container');
    var offset = startchange.offset();
    if (scroll_start < offset.top - 200) { // top 
      $('.subheader').fadeOut(300);
    } else { // bottom
      $('.subheader').fadeIn(300);
    }
  });


  $('.menu-toggle').on('click', function(){
    if(toggleFlag == 1){
    $('.mainnav').stop().hide();     
      toggleFlag = 0;
    $('.dropmenu').stop().slideDown('150'); 
    }else{
    $('.dropmenu').stop().slideUp('150');
    setTimeout(function(){
    $('.mainnav').stop().show();     
    }, 400);
      toggleFlag = 1;
    }
  });
  $('#campaign').on('click', function(){
    $('.commentdiv').hide();
    $('.supportdiv').hide();
    $('.participatediv').hide();
    $('.project').show();
    console.log('1')
  });

  $('#comment').on('click', function(){
    $('.project').hide();
    $('.supportdiv').hide();
    $('.participatediv').hide();
    $('.commentdiv').show();
        console.log('2')

  });

  $('#support').on('click', function(){
    $('.project').hide();
    $('.commentdiv').hide();
    $('.participatediv').hide();
    $('.supportdiv').show();
        console.log('3')

  });

  $('#participate').on('click', function(){
    $('.project').hide();
    $('.commentdiv').hide();
    $('.supportdiv').hide();
    $('.participatediv').show();
    console.log('4')
  });


});
