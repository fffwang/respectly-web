$(function () {
        $('.glyphicon-menu-up').on("click",function(){
          var number;
          number = parseInt($(this).parent().siblings(".voteNum").html());
          number += 1;
          $(this).parent().siblings(".voteNum").text(number);          
          var currentColor = $(this).parents(".commentBody").css("background-color");
          var lastParan = currentColor.lastIndexOf(')');
          var lastComma = currentColor.lastIndexOf(',');
          var o = parseFloat(currentColor.slice(lastComma + 1, lastParan));
          
          if(number >= 0){
            $(this).parents(".entryVote").siblings(".commentBox").css("font-weight", "normal");
          $(this).parents(".entryVote").siblings(".commentBox").css("opacity", 1);
            if(o < 0.9){
          o += 0.1;}
          var to = $(this).parents(".entryVote").siblings(".commentBox").css("opacity");
          to += 0.1; 
          }
          if(number > 3){
            $(this).parents(".entryVote").siblings(".commentBox").css("font-weight", "bold");
          }
          var newColor = currentColor.slice(0, lastComma + 1) + o  +")";
                   
          $(this).parents(".commentBody").css("background-color", newColor);
       });
     $('.glyphicon-menu-down').on("click",function(){
          var number;
          number = parseInt($(this).parent().siblings(".voteNum").html());
          number -= 1;
          $(this).parent().siblings(".voteNum").text(number);
          var currentColor = $(this).parents(".commentBody").css("background-color");
          var lastParan = currentColor.lastIndexOf(')');
          var lastComma = currentColor.lastIndexOf(',');
          var o = parseFloat(currentColor.slice(lastComma + 1, lastParan));
          
          o -= 0.1;
         if(number <4){
            $(this).parents(".entryVote").siblings(".commentBox").css("font-weight", "normal");
         }
         if(number < 0 && o < 0.2){
          var to = $(this).parents(".entryVote").siblings(".commentBox").css("opacity");
          to -= 0.1; 
          $(this).parents(".entryVote").siblings(".commentBox").css("opacity", to);
         ;}
          var newColor = currentColor.slice(0, lastComma + 1) + o  +")";
                   
          $(this).parents(".commentBody").css("background-color", newColor);
       });
    });
