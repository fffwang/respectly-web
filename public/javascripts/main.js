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
  $('#campaign').on('click', function(e){
    e.preventDefault();
    $('.commentdiv').hide();
    $('.supportdiv').hide();
    $('.participatediv').hide();
    $('.project').show();
  });

  $('#comment').on('click', function(e){
    e.preventDefault();
    $.ajax({
      type: 'GET',
      url: '/comments',
      dataType: 'json',
      success: function (data) {
        $('.commentdiv').empty();
        data.comments.forEach(function(comment) {
          $('.commentdiv').append(
            '<div class="commentBody">' +
              '<div class="commentBox">' +
                '<div class="name">' + comment._writer.profile.name + '</div>' +
                '<div class="comment-content">' + comment.body + '</div>' +
                '<div class="comment-delete">수정 버튼</div>' +
                '<div class="comment-delete">삭제 버튼</div>' +
              '</div>' +
            '</div>');
        });
      }
    });
    
    $('.project').hide();
    $('.supportdiv').hide();
    $('.participatediv').hide();
    $('.commentdiv').show();
  });

  $('#support').on('click', function(){
    $('.project').hide();
    $('.commentdiv').hide();
    $('.participatediv').hide();
    $('.supportdiv').show();
  });

  $('#participate').on('click', function(){
    $('.project').hide();
    $('.commentdiv').hide();
    $('.supportdiv').hide();
    $('.participatediv').show();
  });


});
