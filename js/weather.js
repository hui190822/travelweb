$(document).ready(function() {


    $('form').submit(function() {
        $.get('http://api.openweathermap.org/data/2.5/weather?q=' + $('#weather_input').val() + '&units=imperial&appid=506c04c8964f81d05743f45f600991e8', function(weather) {
            var html_str = "";
            html_str += "<h2>City: " + weather.name + "</h2>";
            html_str += "<h3>Temperature: " + weather.main.temp.toFixed(0) + " Fahrenheit</h3>";
            $('#weather_loc').append(html_str);
        }, "json");
        return false;
    });

});


