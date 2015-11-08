$(document).ready(function () {
    /* smooth scrolling for scroll to top */
    $(".scroll-top").click(function() {
        $("body,html").animate({ scrollTop: 0 }, 800);
    });

    /* smooth scrolling for scroll down */
    $(".scroll-down").click(function() {
        $("body,html").animate({ scrollTop: $(window).scrollTop() + 800 }, 1000);
    });

    /* highlight the top nav as scrolling occurs */
    $("body").scrollspy({ target: "#navbar" });

    /* Set year as copyright */
    var year = new Date().getFullYear();
    $("#year").html(year);

    (function ($) {
        $.fn.goTo = function () {
            $("html, body").animate({
                scrollTop: $(this).offset().top + "px"
            }, "slow");
            return this; // for chaining...
        }
    })(jQuery);

    /* set the tabs */
    $("#skillTabs a").click(function(e) {
        //e.preventDefault();
        $(this).tab("show");
    });

    $.getJSON("../json_data/skills.json", function(skillData) {
        /* set the word cloud */
        var skillCanvas = document.getElementById("skillCanvas");
        var ctx = skillCanvas.getContext("2d");
        ctx.canvas.width = window.innerWidth * 0.5;
        ctx.canvas.height = window.innerHeight * 0.5;
        WordCloud(skillCanvas, skillData);

        /* set skill list */
        skillData.list.sort(function(a, b) {
            return b[1] - a[1];
        });

        $("#skillTable").append("<tr>");
        for (var i = 0; i < skillData.list.length; i++) {
            var skill = skillData.list[i][0];
            if (i % 6 === 0 & i !== 0) {
                $("#skillTable").append("</tr>");
                $("#skillTable").append("<tr>");
                
            }
            $("#skillTable").append("<td>" + skill + "</td>");
        }
        $("#skillTable").append("</td>");
    });

    //$("#skillTabs a:last").tab("show");
    //$("#skillTabs a:first").tab("show");
});