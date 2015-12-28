$(function () {
  Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: true,

    // Number - Number of animation steps
    animationSteps: 60,

    // String - Animation easing effect
    // Possible effects are:
    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
    //  easeOutElastic, easeInCubic]
    animationEasing: "easeOutQuart",

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: null,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    // Number - The scale starting value
    scaleStartValue: null,

    // String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    // Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 12,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#666",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: false,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
    customTooltips: false,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(0,0,0,0.8)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "bold",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

    // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value %>",

    // Function - Will fire on animation progression.
    onAnimationProgress: function(){},

    // Function - Will fire on animation completion.
    onAnimationComplete: function(){}
  };

  function codeToDepartment(data) {
    var departments = ["법과대학", "경영대학", "문과대학", "생명과학대학", "정경대학", "이과대학", "공과대학", "사범대학", "간호대학", "정보통신대학", "정보대학", "디자인조형학부", "국제학부", "미디어학부", "자유전공학부", "정보보호학부"];
    return data === -1 ? "단과대학" : departments[data];
  }

  function renderNameEl(data) {
    var layerEl = $('#name-list').empty();
    for (var i = 0; i < data.length; i++) {
      var nameEl = [
        "<div class='name-box' style='background: " + randomColor({luminosity: 'light'}) + ";'>",
          "<h4 class='hanna text-center'>",
            codeToDepartment(data[i].profile.department),
          "</h4>",
          "<h3 class='hanna text-center'>",
            data[i].profile.name,
          "</h3>",
        "</div>"
      ].join('');
      layerEl.append(nameEl);
    }
  }

  function renderSupTextEl(count, goal) {
    var layerEl = $('#supporters-right').empty();
    var textDom = [
      "<div class='right-text-wrapper'>",
        "<h2 class='hanna text-center'>",
          "목표 " + goal + "명 중 " + count + "명의 지지를 받고 있습니다.",
        "</h2>",
      "</div>",
      "<div>",
        "<h1 class='hanna text-center'>",
          "진행률: " + Math.floor(count / goal * 100) + "%",
        "</h1>",
      "</div>"
    ].join('');
    layerEl.append(textDom);
  }

  function renderParTextEl(count) {
    var layerEl = $('#participate-right').empty();
    var textDom = [
      "<div class='right-text-wrapper'>",
        "<h1 class='hanna text-center'>",
          "총 " + count + "명이 참여 중인 프로젝트입니다.",
        "</h1>",
      "</div>"
    ].join('');
    layerEl.append(textDom);
  }

  $("#support").click(function(e) {
    e.preventDefault();
    // Need actual pid in request url
    $.ajax({
      method: "GET",
      url: "/charts/supporters?pid=567f9c15b075f741a91ad3a7",
      dataType: "json",
      success: function(res) {
        var ctxSup = $("#supporters-chart").get(0).getContext("2d");
        var supChartData = res.chartData;
        var supChart = new Chart(ctxSup).Doughnut(supChartData, {});
        renderSupTextEl(res.supportersCount, res.supportersGoal);
      }
    });
  });

  $("#participate").click(function(e) {
    e.preventDefault();
    // Need actual pid in request url
    $.ajax({
      method: "GET",
      url: "/charts/participants?pid=567f9c15b075f741a91ad3a7",
      dataType: "json",
      success: function(res) {
        renderNameEl(res.data);
        renderParTextEl(res.data.length);
      }
    });
  });
  
});
