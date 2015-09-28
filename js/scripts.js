
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
});