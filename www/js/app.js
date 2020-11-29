
document.addEventListener('deviceready', onDeviceReady, false);

//Lots of checks to see if we have to open the initiation page or home page.
if (localStorage.getItem('restaurant') == null || localStorage.getItem('restaurant') == "true" && localStorage.getItem('restaurant_id') == null || localStorage.getItem("restaurantinfo") == null && localStorage.getItem("restaurant") == "true" || localStorage.getItem("userinfo") == null && localStorage.getItem("restaurant") == "false") {

    //Layout changes
    $("body").css('background-image', 'url("img/background.png")');
    $(".nav-wrapper").append('<a href="#!" id="back" class="white-text left"><i class="material-icons">keyboard_backspace</i></a>')
    $('.tabs a').hide();
    $("#title").text("Register");
    $(".footer .tabs").removeClass('white').addClass('blue darken-3')
    $("#title").removeClass('left').addClass('center')

    //Initiate Checkrestaurant 
    Checkrestaurant.init();

} else {

    //Layout changes
    $("body").css('background-image', 'url("img/background2.png")');
    $('#homePage').show()

    //Depending on if you are a restaurant or not we hide some tabs

    if (localStorage.getItem('restaurant') == "false") {
        $('.restauranttabs').hide()
        $('.switch input').prop('checked', false)

    } else {
        $('.customertabs').hide()
        $('.switch input').prop("checked", true)

    }

    //Initiate tabs and dropdown
    $('.dropdown-trigger').dropdown({
        coverTrigger: false,
    });
    $('.tabs').tabs();

    //SPA navigation
    $('.footer .tabs a').click(function () {
        $('.spa').hide();
        $('#' + $(this).data('show')).show();
    });

    $('.dropdown-content a').click(function (result) {
        $('.spa').hide();
        $('#infoTab').show();

    })

    //Call Homepage.switchRestaurant function after switch changes
    $("#switch").change(Homepage.switchRestaurant);
}



function onDeviceReady() {
    Myprofile.init();
    GenerateQR.init();
    ScanQR.init();
    Alertcustomers.init();
    Homepage.init();
}

