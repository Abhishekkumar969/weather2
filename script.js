/*********************Weather checker**********************/

const [pin, setPin] = useState('');
const [iframeLink, setIframeLink] = useState(null);

// Sample user data (ideally from Firestore)
const userLinks = {
  "1234": "https://drumjs0.netlify.app/",
  "5678": "https://your-second-user-panel.netlify.app/",
  // etc.
};

const handlePinSubmit = () => {
  const link = userLinks[pin];
  if (link) {
    setIframeLink(link); // open correct panel
  } else {
    alert("Invalid PIN");
  }
};




const TempConverter = document.getElementById('temp-converter');
const Tempbtn = document.getElementById('temp-btn');
const weatbtn = document.getElementById('weather-btn');
const weathercontent = document.getElementById('weather-content');
let weatherbox = document.getElementById('weather-box');
var inputvalue = document.querySelector('#search-city');
var search = document.querySelector('#search');
var city = document.querySelector('#cityoutput');
var details = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
apikey = "d2b60802dc76aac6164b34fffa8a5bee"
//var cityURL = ""+inputvalue;

function convertion(val) {
    return parseInt(val - 273);
}

Tempbtn.addEventListener('click', function () {
    TempConverter.style.display = 'flex';
    weatbtn.style.display = 'block';
    weathercontent.style.display = 'none';
    Tempbtn.style.display = 'none';
});
weatbtn.addEventListener('click', function () {
    TempConverter.style.display = 'none';
    weatbtn.style.display = 'none';
    weathercontent.style.display = 'block';
    Tempbtn.style.display = 'block';
});

function performSearch() {
    TempConverter.style.display = 'none';
    Tempbtn.style.display = 'block';
    weathercontent.style.display = 'block';

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputvalue.value + '&appid=' + apikey)

        .then(res => res.json())


        .then(data => {
            var nameval = data['name']
            var descri = data['weather']['0']['description']
            var temperature = data['main']['temp']
            var wndsped = data['wind']['speed']
            console.log(nameval);
            console.log(descri);
            console.log(temperature);
            console.log(wndsped);


            city.innerHTML = `Weather of <br><span>${nameval}</span>`
            temp.innerHTML = `<span>${convertion(temperature)} °C</ span>`
            details.innerHTML = `<span>${descri}</span>`
            wind.innerHTML = `Wind Speed: <br><span>${wndsped} km/h </span>`

            if (descri.includes("clouds")) {
                weatherbox.style.backgroundImage = "url('Cloudy.jpg')";
            }
            if (descri.includes("rain")) {
                if (descri.includes("light")) {
                    weatherbox.style.backgroundImage = "url('LightRainShower.jpg')";
                }
                if (descri.includes("freezing")) {
                    weatherbox.style.backgroundImage = "url('FreezingRain.jpg')";
                }
                if (descri.includes("heavy")) {
                    weatherbox.style.backgroundImage = "url('HeavyRain.jpg')";
                }
                else {
                    weatherbox.style.backgroundImage = "url('Rain.jpg')";
                }
            }
            if (descri.includes("drizzle")) {
                weatherbox.style.backgroundImage = "url('Drizzle.jpg')";
            }
            if (descri.includes("fog") || descri.includes("haze" || descri.includes("mist"))) {
                weatherbox.style.backgroundImage = "url('Fog.jpg')";
            }
            if (descri.includes("sunny")) {
                if (descri.includes("mostly")) {
                    weatherbox.style.backgroundImage = "url('MostlySunny.jpg')";
                }
                else {
                    weatherbox.style.backgroundImage = "url('Sunny.jpg')";
                }
            }
            if (descri.includes("night")) {
                weatherbox.style.backgroundImage = "url('Night.jpg')";
            }
            if (descri.includes("thunder")) {
                weatherbox.style.backgroundImage = "url('Thunderstorm.jpg')";
            }
            if (descri.includes("snow")) {
                if (descri.includes("light")) {
                    weatherbox.style.backgroundImage = "url('LightSnowShower.jpg')";
                }
                else {
                    weatherbox.style.backgroundImage = "url('Snow.jpg')";
                }
            }
            if (descri.includes("clear")) {
                weatherbox.style.backgroundImage = "url('Clear.jpg')";
            }


        })

        .catch(err => alert('You entered the wrong city'));


}

search.addEventListener("click", performSearch);
/***************Temperature Converter*********************/

function changeUnit() {
    const temperatureInput = document.getElementById("input-temp").value;
    const unit = document.getElementById("unit").value;
    const output11 = document.getElementById("output1-1");
    const output12 = document.getElementById("output1-2");
    const output21 = document.getElementById("output2-1");
    const output22 = document.getElementById("output2-2");


    if (unit == "celsius") {
        output12.innerHTML = `°F`;
        output22.innerHTML = `K`;
        if (temperatureInput != "") {
            const fahrenheit = (parseFloat(temperatureInput) * 9 / 5) + 32;
            const kelvin = parseFloat(temperatureInput) + 273.15;
            output11.innerHTML = fahrenheit;
            output21.innerHTML = kelvin;
        }
    } else if (unit == "fahrenheit") {
        output12.innerHTML = `°C`;
        output22.innerHTML = `K`;
        if (temperatureInput != "") {
            const celsius = (parseFloat(temperatureInput) - 32) * 5 / 9;
            const kelvin = (parseFloat(temperatureInput) - 32) * 5 / 9 + 273.15;
            output11.innerHTML = celsius;
            output21.innerHTML = kelvin;
        }
    } else if (unit == "kelvin") {
        output12.innerHTML = `°C`;
        output22.innerHTML = `°F`;
        if (temperatureInput != "") {
            const celsius = parseFloat(temperatureInput) - 273.15;
            const fahrenheit = (parseFloat(temperatureInput) - 273.15) * 9 / 5 + 32;
            output11.innerHTML = celsius;
            output21.innerHTML = fahrenheit;
        }
    }
}

/*********************preloader**************************/

const ImgPaths = [
    'Cloudy.jpg',
    'LightRainShower.jpg',
    'FreezingRain.jpg',
    'HeavyRain.jpg',
    'Rain.jpg',
    'Drizzle.jpg',
    'Fog.jpg',
    'MostlySunny.jpg',
    'Sunny.jpg',
    'Night.jpg',
    'Thunderstorm.jpg',
    'Snow.jpg',
    'LightSnowShower.jpg',
    'Clear.jpg'
];


function preloadImg(ImgPaths, callback) {
    let loadImg = 0;

    for (const ImgPath of ImgPaths) {
        const img = new Image();
        img.src = ImgPath;

        console.log("load3");
        img.onload = function () {
            loadImg++;
            if (loadImg === ImgPaths.length) {
                callback();
            }
        };
    }
}

function handleImgLoad() {
    console.log("load2");
    document.body.classList.add("loaded");
}


window.onload = function () {
    console.log("load");
    preloadImg(ImgPaths, handleImgLoad);
};