/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global $,firebase */

$(document).ready(function () {
    "use strict";
    $("#rlForm").click(function () {
        $("#login-form").animate({height: "toggle", opacity: "toggle"}, "slow");
        $("#register-form").animate({height: "toggle", opacity: "toggle"}, "slow");
    });
    $("#lrForm").click(function () {
        $("#login-form").animate({height: "toggle", opacity: "toggle"}, "slow");
        $("#register-form").animate({height: "toggle", opacity: "toggle"}, "slow");
    });
    $("#lfForm").click(function () {
        $("#login-form").animate({height: "toggle", opacity: "toggle"}, "slow");
        $("#forgot-form").animate({height: "toggle", opacity: "toggle"}, "slow");
    });
    $("#flForm").click(function () {
        $("#login-form").animate({height: "toggle", opacity: "toggle"}, "slow");
        $("#forgot-form").animate({height: "toggle", opacity: "toggle"}, "slow");
    });
    $("#frForm").click(function () {
        $("#forgot-form").animate({height: "toggle", opacity: "toggle"}, "slow");
        $("#register-form").animate({height: "toggle", opacity: "toggle"}, "slow");
    });
    
});
