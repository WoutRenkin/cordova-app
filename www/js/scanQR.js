let ScanQR = function () {
    let init = function () {

        //When clicked we open qr scanner.
        $('#qrscan').click(_scanQr)

    };

    let _scanQr = function () {
        //This will call the plugin barcodescanner
        cordova.plugins.barcodeScanner.scan(
            //Result will be the ID of the restaurant so we can call our api
            function (result) {
                _apiCallVisit(result.text)
            },
            function (error) {
                alert("Scanning failed: " + error);
            },
            {
                //Options for our barcode scanner
                showFlipCameraButton: true,
                showTorchButton: true,
                prompt: "Place a QR-code inside the scan area",
                resultDisplayDuration: 500,
                formats: "QR_CODE",
                orientation: "portrait",

            }
        );

    }

    let _apiCallVisit = function (result) {
        //Here we do a call to our api with visit information, this includes the user name and email + restaurant ID
        let _info = JSON.parse(localStorage.getItem('userinfo'))
        let data = {
            firstname: _info["First name"],
            lastname: _info["Last name"],
            useremail: _info["Email address"],
            restaurant_id: parseInt(result)
        }
        $.ajax({
            type: 'put',
            url: 'http://192.168.178.33:5000/visit',
            data: data,
            success: function () {
                M.toast({ html: 'Scan was succesful', classes: 'green' })

            },
            error: function (result) {
                if (result.status == 404) {
                    M.toast({ html: 'We could not find the restaurant you are visiting...', classes: 'red' })
                }
                if (result.status == 500) {
                    M.toast({ html: 'Server not found, check your internet connection', classes: 'red' })
                }

            }
        });
    }

    return {
        init: init
    };
}();