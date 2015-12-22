$('document').ready(function () {

  $(".music").on("click", function (e) {
    e.preventDefault();
    console.log('it');
    $(".playmode").toggleClass("glyphicon-pause glyphicon-play");
    if ($(this).find("span").hasClass("glyphicon-pause")) {
      $("#audio")[0].play();
    } else {
      $("#audio")[0].pause();
    }
  });

});
