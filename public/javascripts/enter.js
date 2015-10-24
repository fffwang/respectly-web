$(function () {
  $('#joinCall').on('click', function(){
    $.ajax({
      method: "POST",
      url: "/signup",
      data: {
        id: $('#join-id').val(),
        password: $('#join-password').val(),
        email: $('#join-email').val(),
        studentNumber: $('#join-student-number').val(),
        name: $('#join-name').val()
      } 
    }).done(function(msg){
        console.log(msg);
    });
  });

  $('#loginCall').on('click', function(){
    $.ajax({
      method: "POST",
      url: "/signin",
      data: {
        id: $('#login-id').val(),
        password: $('#login-password').val()
      } 
    }).done(function(msg){
        console.log(msg);
    });
  });
});
