let Homepage = function () {
  let init = function () {

    //Start API call for corona statistics
    _apiCovidData()

  }

  let _apiCovidData = function () {
    //Fill variable _covidBelgium with Corona Statistics
    let _covidBelgium = {}

    $.ajax({
      url: 'https://corona.lmao.ninja/v2/countries/Belgium?yesterday=true&strict=true&query=',
      dataType: 'json',
      success: function (data) {
        var d = new Date();
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var strDate = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
        _covidBelgium["Total cases"] = data.cases
        _covidBelgium["Total deaths"] = data.deaths
        _covidBelgium["Total new cases"] = data.todayCases
        _covidBelgium["Total new deaths"] = data.todayDeaths
        _covidBelgium["Updated on"] = strDate

        //Change 10000 to 10.000, reads better
        $.each(_covidBelgium, function (index, value) {
          if ($.isNumeric(value)) {
            _covidBelgium[index] = value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
          }
        })

        //Save statistics in local data
        localStorage.setItem('covidBelgium', JSON.stringify(_covidBelgium));

      }, error: function (result) {
        console.log(result)
      }
    });

    //Here we do exactly the same as the previous API call but here we get data from the whole world.
    let _covidWorld = {}

    $.ajax({
      url: 'https://disease.sh/v3/covid-19/all',
      dataType: 'json',
      success: function (data) {
        var d = new Date();
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var strDate = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
        _covidWorld["Total cases"] = data.cases
        _covidWorld["Total deaths"] = data.deaths
        _covidWorld["Total new cases"] = data.todayCases
        _covidWorld["Total new deaths"] = data.todayDeaths
        _covidWorld["Updated on"] = strDate

        $.each(_covidWorld, function (index, value) {
          if ($.isNumeric(value)) {
            _covidWorld[index] = value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
          }
        })

        localStorage.setItem('covidWorld', JSON.stringify(_covidWorld));

      }
    });

    //After we gathered all data we call _showData
    _showData()
  }

  let _showData = function () {

    _covidBelgium = JSON.parse(localStorage.getItem('covidBelgium'))
    _covidWorld = JSON.parse(localStorage.getItem('covidWorld'))

    //Write all data in our cards we made in html on our home page
    $('#belgium').append(`
        <table>
        <tr>
          <th>Total cases:</th>
          <td>${_covidBelgium["Total cases"]}</td>
        </tr>
        <tr>
          <th>Total deaths:</th>
          <td>${_covidBelgium["Total deaths"]}</td>
        </tr>
        <tr>
          <th>Daily cases:</th>
          <td>${_covidBelgium["Total new cases"]}</td>
        </tr>
        <tr>
          <th>Daily deaths:</th>
          <td>${_covidBelgium["Total new deaths"]}</td>
        </tr>
      </table>
      <br/>
      <p class="grey-text text-darken-1">Updated on ${_covidBelgium["Updated on"]}</p>`
    );

    $('#global').append(`      
      <table>
      <tr>
        <th>Total cases:</th>
        <td>${_covidWorld["Total cases"]}</td>
      </tr>
      <tr>
        <th>Total deaths:</th>
        <td>${_covidWorld["Total deaths"]}</td>
      </tr>
      <tr>
        <th>Daily cases:</th>
        <td>${_covidWorld["Total new cases"]}</td>
      </tr>
      <tr>
        <th>Daily deaths:</th>
        <td>${_covidWorld["Total new deaths"]}</td>
      </tr>
    </table>
    <br/>
    <p class="grey-text text-darken-1">Updated on ${_covidWorld["Updated on"]}</p>
    `);


  }


  let _checkResponse = function (buttonIndex) {
    //Check is switch is pointing at restaurant or customer
    let status = $("#switch").prop('checked');

    //If user pressed continue we change the value of restaurant parameter to the correct state
    if (buttonIndex == 1) {
      if (status == true) {
        localStorage.setItem("restaurant", "true")

      } else {
        localStorage.setItem("restaurant", "false")
      }

      //Reload page to show the new customer or restaurant pages
      setTimeout(function () {
        window.location.reload();
      }, 100);

    } else {

      //If user canceled the switch request we set values back to normal
      if (localStorage.getItem("restaurant") == "true") {
        $('.switch input').prop("checked", true)
      } else {
        $('.switch input').prop('checked', false)
      }
    }
  }

  let switchRestaurant = function () {
    //If switch status is changed we check the value, depending on what the value is we change our notification text.
    let status = $(this).prop('checked');
    if (status == true) {
      navigator.notification.confirm(
        'Press continue if you want to switch to restaurant mode.',
        _checkResponse,
        'Switching...',
        ['continue', 'cancel']
      );

    } else {
      navigator.notification.confirm(
        'Press continue if you want to switch to customer mode.',
        _checkResponse,
        'Switching...',
        ['continue', 'cancel']
      );
    }




  }
  return {
    init: init,
    switchRestaurant: switchRestaurant
  };
}();