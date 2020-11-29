let Forms = function () {

    let init = function () {

        //Hide the first page
        $('#firstPage').hide()

        //Back button
        $('#back').click(_goBack)


        let restaurant = localStorage.getItem('restaurant')
        let restaurantinfo = localStorage.getItem("restaurantinfo")
        let userinfo = localStorage.getItem("userinfo")
        let restaurant_id = localStorage.getItem("restaurant_id")

        //Some checks to initialize the correct form
        if (restaurant == "true" && !restaurantinfo) {
            $('#restaurantForm').show()
            $("#formrestaurant").submit(_restaurantData)
        }

        if (restaurant == "true" && !restaurant_id) {
            $('#restaurantForm').show()
            $("#formrestaurant").submit(_restaurantData)
        }

        if (restaurant == "false" && !userinfo) {
            $('#customerForm').show()
            $("#formcustomer").submit(_customerData)
        }

        if (restaurant == "false" && userinfo || restaurant == "true" && restaurantinfo && restaurant_id) {
            setTimeout(function () {
                window.location.reload();
            }, 100);
        }
    };
    //We read information from form
    let _restaurantData = function (e) {
        e.preventDefault();
        _info = {}
        _info["Restaurant name"] = $("#restaurant_name").val()
        _info["Telephone number"] = $("#telephonerest").val()
        _info["Email address"] = $("#emailrest").val()

        //Call API to add restaurant information
        _putRequestRestaurant(_info)
    }


    let _putRequestRestaurant = function (_info) {
        //API call to add restaurant information
        let data = {
            restaurantname: _info["Restaurant name"],
            restaurantemail: _info["Email address"],
            telephonenumber: _info["Telephone number"]
        }

        $.ajax({
            type: 'put',
            url: 'http://192.168.178.33:5000/restaurant',
            data: data,
            success: function (result) {
                _setLocalStorage(_info)
                localStorage.setItem('restaurant_id', result.id)

            },
            error: function (result) {
                if (result.status == 404) {
                    M.toast({ html: 'Something went wrong, try again later...', classes: 'red' })
                }
                if (result.status == 500) {
                    M.toast({ html: 'Server not found, check your internet connection', classes: 'red' })
                }

            }
        });
    }

    let _customerData = function () {
        //Read information from form
        _info = {}
        _info["First name"] = $("#first_name").val()
        _info["Last name"] = $("#last_name").val()
        _info["Telephone number"] = $("#telephone").val()
        _info["Email address"] = $("#email").val()
        _setLocalStorage(_info)

    }

    let _setLocalStorage = function (_info) {
        //Save info in localstorage
        if (localStorage.getItem("restaurant") == "true") {
            localStorage.setItem('restaurantinfo', JSON.stringify(_info));
        } else {
            localStorage.setItem('userinfo', JSON.stringify(_info));
        }

        //Refresh so our checks get reinitialized
        setTimeout(function () {
            window.location.reload();
        }, 100);

    }

    //Remove restaurant parameter and refresh, this will open the first page again.
    let _goBack = function () {
        localStorage.removeItem("restaurant")
        setTimeout(function () {
            window.location.reload();
        }, 100);
    }


    return {
        init: init,

    };
}();