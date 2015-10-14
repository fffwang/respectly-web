
$(document).ready(function () {
  $('#joinCall').on('click', function(){
    $.ajax({
      method: "POST",
      url: "/signup",
      data: {
        id: $('#id').val(),
        pwd: $('#pwd').val(),
        pmail: $('#pmail').val(),
        snum: $('#snum').val(),
        sname: $('#sname').val()
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
        id: $('#id').val(),
        pwd: $('#pwd').val()
      } 
    }).done(function(msg){
        console.log(msg);
    });
  });
});
