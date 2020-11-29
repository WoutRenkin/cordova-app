let Checkrestaurant = function () {

    let init = function () {

        //Show first page
        $('#firstPage').show()

        //If restaurant paramter already has information: redirect to Forms.init
        if (localStorage.getItem('restaurant') !== null) {
            Forms.init();
        }
        //Trigger click on buttons
        $('#restaurant').click(clickcheck)
        $('#costumer').click(clickcheck)
    };

    let clickcheck = function () {

        //Check if user clicked on restaurant or customer and store result
        if ($(this).text() === "Restaurant") {
            localStorage.setItem('restaurant', "true")
        } else {
            localStorage.setItem('restaurant', "false")
        }

        //Reinitialize so we get redirected
        init()

    };



    return {
        init: init,
    };
}();