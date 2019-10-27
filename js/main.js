function getCityName() 
{
    document.getElementById('Wrapper').style.visibility = 'hidden';
    var height = window.screen.height;
    var width = window.screen.width;
    document.getElementById('container').style.width = width+"px";
    document.getElementById('container').style.height = height+"px";
    document.getElementById('container').style.visibility = 'visible';
    var adress = document.getElementById("input").value;
    console.log(adress);
    
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": 'https://us1.locationiq.com/v1/search.php?key=cdd5add35a3dd9&q='+adress+'&format=json',
      "method": "GET"
    };

    $.ajax(settings).done(function (response) {
        var lat = response[0].lat;
        var lon = response[0].lon;
        console.log(lat);
        console.log(lon);

        var api = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon;
        console.log('https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon);
        
        
    $.getJSON(api, function (res) 
    {
        var celsius = res.main.temp;
        var fahrenheit = Math.round(((celsius * 1.8) + 32),10);
        var max_temp = res.main.temp_max;
        var max_temp_fahrenheit = Math.round(((max_temp*1.8) +32),10);
        var min_temp = res.main.temp_min;
        var min_temp_fahrenheit = Math.floor(((min_temp*1.8) +32),10);
        var location = res.name;
        var wind_speed_kmh = res.wind.speed;
        var wind_speed_mph =Math.round((res.wind.speed/1.6), 10);
        var country = res.sys.country;

        $('.weather-country').html(country);
        $('.weather-location').html(location);
        $('.temp').html(celsius.toFixed(1));
        $('.weather-description').html(res.weather[0].description);
        $('.weather-max').html("max: "+max_temp+"°C");
        $('.weather-min').html("min: "+min_temp+"°C");
        $('.weather-windspeed').html("wind speed: "+ wind_speed_kmh+"km/h");
        $('.weather-cloudiness').html("zu "+res.clouds.all+"% bewölkt")
        $('.weather-cloudiness').html("humidity: "+res.main.humidity+"%")
        $('.weatherType').attr('id', res.weather[0].main);

        $('.row2').on('click', function() 
        {
            if ($('.temp').html() == (celsius)) 
            {
                $('.temp').html(fahrenheit);
                $('.weather-min').html("max: "+min_temp_fahrenheit+"°F");
                $('.weather-max').html("min: "+max_temp_fahrenheit+"°F");
                $('.weather-windspeed').html("wind speed: "+wind_speed_mph+"mp/h");
                $('.temp-type').html('°F');
                $('.btn-temp').html('°C');

                } else {
                    $('.temp').html(celsius);
                    $('.weather-max').html("max: "+max_temp+"°C");
                    $('.weather-min').html("min: "+min_temp+"°C"); 
                    $('.weather-windspeed').html("wind speed: "+wind_speed_kmh+"km/h");
                    $('.temp-type').html('°C');
                    $('.btn-temp').html('°F');
                }
        });
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        
                //SETTING UP THE ICON 
        var icons = new Skycons({
            "color": "white"
        });

        icons.set("Clear", Skycons.CLEAR_DAY);
        icons.set("Clear-night", Skycons.CLEAR_NIGHT);
        icons.set("Partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
        icons.set("Partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
        icons.set("Clouds", Skycons.CLOUDY);
        icons.set("Rain", Skycons.RAIN);
        icons.set("Sleet", Skycons.SLEET);
        icons.set("Snow", Skycons.SNOW);
        icons.set("Wind", Skycons.WIND);
        icons.set("Fog", Skycons.FOG);
        icons.play();               
    });
    });
    
    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }
};