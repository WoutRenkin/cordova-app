let GenerateQR = function () {
    let init = function () {
        //On click we will call the _gerenateQR function
        if (localStorage.getItem("restaurant_id")) {
            _generateQr()

        }


    };

    let _generateQr = function () {
        //Our QR code uses the ID of the restaurant
        let restaurant_id = localStorage.getItem('restaurant_id')
        let options = {
            width: 256,
            height: 256,
            colorDark: "#1565c0",
            colorLight: "#ffffff",
        };
        //This is how we create our QR code, the QR code gets generated in the variable base64EncodedQRImage. We show the message on the page
        cordova.plugins.qrcodejs.encode('TEXT_TYPE', restaurant_id, (base64EncodedQRImage) => {
            console.info('QRCodeJS response is ' + base64EncodedQRImage);
            $('#qrGenerateTab .card .card-image').append(`<img class="center materialboxed" src=${base64EncodedQRImage}></img>`);
            $('#qrgenerate').hide()
        }, (err) => {
            console.error('QRCodeJS error is ' + JSON.stringify(err));
        }, options);

        //Make QR - code bigger on click
        $('.materialboxed').materialbox();
    }
    return {
        init: init
    };
}();