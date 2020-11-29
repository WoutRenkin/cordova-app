let Myprofile = function () {

    let init = function () {

        //Call loadinformation function, we do it in init so the information is directly loaded into myprofile tab
        _loadInformation()

        //click event to edit profile
        $('#editmyprofile').click(_editMyProfile)


    };

    let _loadInformation = function () {

        //Get profile data, depending if user is using the app in restaurant or customer mode we show different information
        let _info
        if (localStorage.getItem("restaurant") == "true") {
            _info = JSON.parse(localStorage.getItem('restaurantinfo'))
        } else {
            _info = JSON.parse(localStorage.getItem('userinfo'))
        }

        //Map profile data and add it to editprofile
        $.each(_info, function (value, key) {
            let item
            switch (value) {
                case "Telephone number":
                    item = `<p><b>${value}</b></p>
                    <input type="tel" class="black-text validate" value="${key}" disabled required>`;
                    break;
                case "Email address":
                    item = `<p><b>${value}</b></p>
                    <input type="email" class="black-text validate" value="${key}" disabled required>`;
                default:
                    item = `<p><b>${value}</b></p>
                    <input type="text" class="black-text validate" value="${key}" disabled required>`;
            }

            $('#editprofile').show();
            $('#profilepreloader').hide()
            $('#myprofileform').append(item);


        })


    }

    let _editMyProfile = function () {
        //First we check if person clicked on edit or save, depending on this information we decide to do something different
        //The create value we check for is the name of the icon
        if ($("#editmyprofile").text() == "create") {
            //If we click on create icon we make all our input editable and change icons + color
            $("#editprofile :input").prop("disabled", false)
            $("#editmyprofile").text("save");
            $("#editmyprofile").removeClass("red").addClass("green")
        } else {
            //If we clicked on save we disable the form again and change icons + color back
            $("#editprofile :input").prop("disabled", true)
            $("#editmyprofile").removeClass("green").addClass("red")
            $("#editmyprofile").text("create");

            //Here we gather all our new information from our form
            let _keys = []

            hm = $("#editprofile p").each(function () {
                _keys.push($(this).text())
            });

            let _values = []
            $("#editprofile :input").each(function () {
                _values.push($(this).val())
            });

            let _info = {};
            _keys.forEach((key, i) => _info[key] = _values[i]);


            //If user is using restaurant mode we have to update the new information in our API.
            if (localStorage.getItem('restaurant') == "true") {
                _patchRequestRestaurant(_info)
            } else {
                _setLocalStorage(_info)
            }
        }
    }

    let _setLocalStorage = function (_info) {
        //Save info in localstorage
        //Show toast that update was succesful.
        $('#editprofile').show();
        $('#profilepreloader').hide()
        if (localStorage.getItem("restaurant") == "true") {
            localStorage.setItem("restaurantinfo", JSON.stringify(_info))
        } else {
            localStorage.setItem("userinfo", JSON.stringify(_info))
        }
        M.toast({ html: 'Update was succesful', classes: 'green' })
    }

    let _patchRequestRestaurant = function (_info) {
        //API call to patch changed restaurant information
        _id = localStorage.getItem('restaurant_id')

        $('#profilepreloader').show()
        $('#editprofile').hide();
        //Create JSON with restaurant information
        let data = {
            restaurantname: _info["Restaurant name"],
            restaurantemail: _info["Email address"],
            telephonenumber: _info["Telephone number"]
        }
        $.ajax({
            type: 'patch',
            url: 'http://192.168.178.33:5000/restaurant/' + _id,
            data: data,

            success: function (result) {
                _setLocalStorage(_info)
            }, error: function (result) {

                if (result.status == 404) {
                    M.toast({ html: 'Something went wrong, try again later...', classes: 'red' })
                }
                if (result.status == 500) {
                    M.toast({ html: 'Server not found, check your internet connection', classes: 'red' })
                }
                $('#editprofile form').empty();
                _loadInformation()



            }
        });

    }



    return {
        init: init,
    };
}();