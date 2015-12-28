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
        $('.commentdiv').append(
          '<div class="commentinput">' +
            '<form action="/comments/write" method="post">' +
              '<input class="commenttextinput" type="text" name="body">' + '</input>' +
              '<button class="btn btn-default" type="submit">제출</button>' +
            '</form>' +
          '</div>' +
          '<ol class="commentbody"></ol>'
        );
        data.comments.forEach(function(comment) {
          $('.commentbody').append(
            '<li class="commentitem">' +
              '<div class="userpicture"><img src="/images/profile-picture.png"/></div>' +
              '<div class="commentbox">' +
              '<h3 class="name">' + comment._writer.profile.name + '</h3>' +
              '<div class="commentedit"><a href="#">edit </a></div>' +
              '<div class="commentdelete"><a href="/comments/delete/' + comment._id + '">delete</div>' +
              '<div class="commentcontent">' + comment.body + '</div>' +
            '</li>'
          );
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
