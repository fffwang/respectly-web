$(function () {
  var messages = [];
  var messageDom = $('#modal-message-container');
  
  function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }
  
  function validate(info, type) {
    messages = [];
    messageDom.empty();
    if (info.password < 8) messages.push("비밀번호는 8자 이상이어야 합니다.");
    if (type === 'join') {
      if (!validateEmail(info.email)) messages.push("이메일 형식이 잘못되었습니다.");
      if (info.studentNumber.length !== 10) messages.push("올바른 학번의 형식이 아닙니다.");
    }
    
    return messages.length === 0;
  }
  
  function showErrMsgs() {
    var appendDom = '';
    for (var i = 0; i < messages.length; i++) {
      appendDom += [
        '<div class="alert alert-danger">',
          '<h4 class="modal-message">' + messages[i] + '</h4>',
        '</div>'
      ].join('');
    }
    messageDom.append(appendDom);
  }
  
  function getUserInfo(type) {
    if (type === 'join') {
      return {
        email: $('#join-email').val(),
        password: $('#join-password').val(),
        portalID: $('#join-portal-id').val(),
        studentNumber: $('#join-student-number').val(),
        name: $('#join-name').val()
      };
    } else {
      return {
        email: $('#login-email').val(),
        password: $('#login-password').val()
      }
    }
  }
  
  $('#joinCall').on('click', function() {
    var type = 'join';
    var userInfo = getUserInfo(type);
    if (!validate(userInfo, type)) {
      showErrMsgs();
      return false;
    }
    
    $.ajax({
      method: "POST",
      url: "/signup",
      dataType: 'json',
      data: userInfo
    }).done(function(res){
      if (res.message.toLowerCase() === "successfully signed in.") {
        window.location.href = "/";
      } else {
        alert(res.message);
      }
    });
  });

  $('#loginCall').on('click', function() {
    var type = 'login';
    var userInfo = getUserInfo(type);
    if (!validate(userInfo, type)) {
      showErrMsgs();
      return false;
    }
    
    $.ajax({
      method: "POST",
      url: "/signin",
      dataType: "json",
      data: userInfo
    }).done(function(res){
      if (res.message.toLowerCase() === "successfully signed in.") {
        window.location.href = "/";
      } else {
        alert(res.message);
      }
    });
  });
});
