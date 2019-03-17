
$(document).ready(function(){
    dropdownHandler();
    console.log("document ready");
});


function dropdownHandler(){
    var $dropdownMenu = $("#sjc-dropdown");

    $('#dropdown_about').hover(
        function(){
            console.log("trigger hover");
            $dropdownMenu.show();
        },
        function(){
            console.log("close menu");
            $dropdownMenu.hide();
            }
    );
    $('#sjc-dropdown-projects').click(
        function(){
            console.log("going to projects page");
            window.location.replace("projects.html");
        }
    );

    /*$('.navbar-nav > li').click(
        function(){
            console.log("click");
            window.location.href = 'about.html';
        }
    );*/

}

