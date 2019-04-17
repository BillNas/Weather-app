$(document).ready(() => {
    $('#searchForm').on('submit',(e) => {
        let searchText=$('#search').val();
        getWeather(searchText);
        e.preventDefault();
    })
});
function getWeather(search) {
    var url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + search + '&APPID=YourAPIKey';
    $.ajax({
        url: url,
        dataType: "json",
        type: "GET",
        success: function (data) {
            var weather = "";
            weather += "<h2>" + data.city.name + ', ' + data.city.country + "</h2>"; 
            $.each(data.list, function (index, value) {
                weather += "<p>"
                weather += "<b>Date: " + value.dt_txt + "</b>: " // Dates
                weather += value.main.temp + "&degC" // Temperature
                weather += "<span> | " + value.weather[0].description + "</span>"; 
                weather += "<img src='https://openweathermap.org/img/w/" + value.weather[0].icon + ".png'>" 
                weather += "</p>" 
            });
            $("#weather").html(weather);
        }
    })
};
