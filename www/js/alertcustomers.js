let Alertcustomers = function () {

    let init = function () {
        //Call _startAlert function after click
        $('#alertcustomers').click(_startAlert)

        //Initiate the datepickers
        $('.datepicker').datepicker({
            showClearBtn: true,
            multidate: true,
            format: "dd/mm/yyyy"
        })
    };

    let _checkResponse = function (buttonIndex) {
        //Here we check if the user selected OK to initiate _visitCheck()
        if (buttonIndex == 1) {
            _visitCheck()
        }
    }

    let _startAlert = function () {
        //Get date values
        let start_date = $('#start_date').val().split("/").reverse().join("-");
        let end_date = $('#end_date').val().split("/").reverse().join("-");

        //Check if any of the date values were empty
        if (!start_date || !end_date) {
            navigator.notification.alert(
                'Please select two dates, if you want to select one day only you will have to select the same day twice',
                false,
                'Corona alert',
                'OK'
            );
        } else {
            //If both dates are filled in we do a check to make sure the user knows we will be creating a mail.
            navigator.notification.confirm(
                'We will compose an email for you to send to your customers. Press OK if you want to continue',
                _checkResponse,
                'Corona alert',
            );
        }
    };

    let _visitCheck = function () {

        //Gather some information needed to do our API call, we do an API call to gather emails from visitors
        let _restaurant_id = localStorage.getItem('restaurant_id')

        //Getting the dates again
        let start_date = $('#start_date').val().split("/").reverse().join("-");
        let end_date = $('#end_date').val().split("/").reverse().join("-");

        //Here we will do the get request
        $.ajax({
            type: 'get',
            url: 'http://192.168.178.33:5000/restaurant/' + _restaurant_id + "/startdate=" + start_date + "/enddate=" + end_date,
            success: function (result) {
                //If we didn't have any customers we won't be making an email.
                if (Object.keys(result).length == 0) {
                    navigator.notification.alert(
                        "You didn't have any visitors during the days you've selected.",
                        false,
                        'Corona alert',
                        'OK'
                    );
                } else {
                    //Only start API call if we got a result that isn't empty
                    _composeEmail(result)
                }
            },
            error: function (result) {
                if (result.status == 404) {
                    M.toast({ html: 'We could not find your restaurant...', classes: 'red' })
                }
                if (result.status == 500) {
                    M.toast({ html: 'Server not found, check your internet connection', classes: 'red' })
                }

            }
        });
    }

    //Compose our email
    let _composeEmail = function (result) {
        let _mails = []
        $.each(result, function (index) {
            _mails.push(result[index])
        })
        let _info = JSON.parse(localStorage.getItem('restaurantinfo'))
        cordova.plugins.email.open({
            to: _mails,
            subject: 'Coronavirus Alert!',
            body: 'Dear Sir/Madam,\n\nWe want to warn you that a coronavirus case has been reported at our restaurant.\nPlease contact your doctor and take the necessary precautions meanwhile.\n\nThank you,\n' + _info["Restaurant name"]
        });
    }



    return {
        init: init,
    };
}();