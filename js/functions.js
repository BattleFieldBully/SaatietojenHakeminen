const url = 'https://api.openweathermap.org/data/2.5/weather?'; 
const icon_url = 'https://openweathermap.org/img/wn/';
const api_key  = '';

const temp_span = document.querySelector('#temp');
const speed_span = document.querySelector('#speed');
const direction_span = document.querySelector('#direction');
const description_span = document.querySelector('#description');
const icon_image = document.querySelector('img');


const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                console.log("Latitude:", lat, "Longitude:", lng);  

                document.querySelector('#lat').innerHTML = lat.toFixed(3) + ', ';
                document.querySelector('#lng').innerHTML = lng.toFixed(3);

                
                getWeather(lat, lng);
            },
            (error) => {
                console.error("Geolocation error:", error.message);
                alert(error.message);
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
};


const getWeather = (lat, lng) => {
    const address = `${url}lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`;

    console.log("Requesting weather data from:", address); 

    axios.get(address)
    .then((response) => {
        console.log("Weather data received:", response.data); 
        
        const json = response.data;
        temp_span.innerHTML = json.main.temp + '&#8451;';
        speed_span.innerHTML = json.wind.speed + ' m/s';
        direction_span.innerHTML = json.wind.deg + ' &#176;';
        description_span.innerHTML = json.weather[0].description;

        const image = icon_url + json.weather[0].icon + '@2x.png';
        icon_image.src = image;
    })
    .catch((error) => {
        console.error("Error fetching weather data:", error.response);  
        alert("Error fetching weather data. " + error.message);
    });
};


getLocation();
