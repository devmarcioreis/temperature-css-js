const container = document.querySelector('.container');
const search = document.querySelector('.search-bar button'); 
const weatherBox = document.querySelector('.weather'); 
const weatherDetails = document.querySelector('.weather-details'); 
const error404 = document.querySelector('.not-found'); 

search.addEventListener('click', () => {
   
    const APIKey = '127c12689ebeae2de3a9eb9f81683a6b';
    const city = document.querySelector('.search-bar input').value;

    if(city === '')
       return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${APIKey}`)
         .then(response => response.json())
         .then(json => {

            if(json.cod === '404') {
                

                weatherBox.style.display = 'none'
                weatherDetails.style.display = 'none'

                error404.style.display = 'block';
                error404.classList.add('fadeIn')

                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather img');
            const temperature = document.querySelector('.weather .temperature');
            const description = document.querySelector('.weather .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
               case 'Clear':
                   image.src = 'assets/images/clear.png';
                   break;

               case 'Rain':
                   image.src = 'assets/images/rain.png';
                   break;

               case 'Snow':
                   image.src = 'assets/images/snow.png';
                   break;

               case 'Clouds':
                   image.src = 'assets/images/cloud.png';
                   break;

               case 'Haze':
                   image.src = 'assets/images/mist.png';
                   break;

               default:
                   image.src = '';
           }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');

            container.style.height = '600px';

         });

})
