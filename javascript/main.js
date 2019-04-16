$(document).ready(() => {
    $('#searchForm').on('submit',(e) => {
        let searchText=$('#search').val();
        getWeather(searchText);
        e.preventDefault();
    })
});

//The temperature data that gets returned is in Kelvin so we need to convert it to Celcius

function convertToCelcius(k){
    var Celcius = k - 273.15;
    return Celcius;
}

function getWeather(search) {
    var url='http://api.openweathermap.org/data/2.5/forecast?q='+search+'&APPID=YourAPIKey';
    let output='';
    let error='';
    $('#heroes').html(output);
    $('#error').html(error);
    if(search===''){
        error='<div>Please enter a city name.</div>';
        loading='';
        $('#loading').html(loading)
        $('#error').html(error)

    }
    else {
        axios.get(url)

            .then((response) => {
                let city = response.data.city.name;
                let temp=response.data.list[0].main.temp;
                let country = response.data.city.country;
                let humidity = response.data.list[0].main.humidity
                let icon = response.data.list[0].weather[0].icon;
                let weather = response.data.list[0].weather[0].description;
                temp=Math.round(convertToCelcius(temp));

                    let output = `
         <div class="jumbotron"  class="row">
        <div class="col">
        <div class="well text-center">
        <h5>${city} , ${country}</h5>
         <h5>${weather}<img src="http://openweathermap.org/img/w/${icon}.png"></h5>
         <h5>Current Temperature : ${temp} C° </h5>
         <h5>Humidity : ${humidity} %</h5>     
</div>
</div>
        `;
                    $('#weather').html(output);

            })


            .catch((err) => {
                error = 'No city found.';
                $('#error').html(error)
                $('#weather').html('');

            });
    }
}
