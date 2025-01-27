const hero = document.querySelector('#hero')
const error = document.querySelector('#error')
const weatherInfoContainer = document.querySelector('#InfoContainer')
const errorMessage = document.querySelector('#errorMessage')
const weatherImage = document.querySelector('#weatherImage')
const temperature = document.querySelector('#temperature')
const city = document.querySelector('#city')
const weather = document.querySelector('#weather')
const humidity = document.querySelector('#humidity')
const wind = document.querySelector('#wind')


document.querySelector('#getWeather').addEventListener('click',()=>{
    const cityName = document.querySelector('#cityName').value

    checkWeather(cityName)
})



async function checkWeather(cityname){
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=e6f75cde0efc71591eeb6dc707d9cea3&units=metric`
    const response = await fetch(weatherApi);
    var weatherData = await response.json();

    if(weatherData.cod === `404` || weatherData.cod ===`400`){
        weatherInfoContainer.style.display = 'none'
        hero.style.display = 'none'
        error.style.display = 'flex'
        errorMessage.textContent = weatherData.message
        
        return;
    }else{
        hero.style.display = 'none'
        error.style.display = 'none'
        weatherInfoContainer.style.display = 'flex'
    }

    console.log(weatherData)

    switch (weatherData.weather[0].main) {
        case 'Clouds':
            weatherImage.src = 'assets/clouds.png'
            break;
        case 'Drizzle':
            weatherImage.src = 'assets/drizzle.png'
            break;
        case 'Mist':
            weatherImage.src = 'assets/mist.png'
            break;
        case 'Rain':
            weatherImage.src = 'assets/rain.webp'
            break;
        case 'Snow':
            weatherImage.src = 'assets/snow.webp'
            break;
        case 'Haze':
            weatherImage.src = 'assets/haze.png'
            break;
        case 'Fog':
            weatherImage.src = 'assets/fog.png'
            break;
    
        default:
            weatherImage.src = 'assets/clear.png'
            break;
    }
    
    temperature.textContent = `${Math.round(weatherData.main.temp)} °C`
    city.textContent = weatherData.name
    weather.textContent = weatherData.weather[0].main
    humidity.textContent = `${weatherData.main.humidity}%`
    wind.textContent = `${weatherData.wind.speed} km/h`

    const showDataTl = gsap.timeline()
    showDataTl.from('.right',{
        duration:1,
        opacity:0,
    })
    showDataTl.from('#temperature',{
        opacity:0,
        x:-10
    })
    showDataTl.from('#weather',{
        opacity:0,
        x:-10
    })
    showDataTl.from('#city',{
        opacity:0,
        y:-20
    })
    showDataTl.from('.cards',{
        opacity:0,
        x:15,
        stagger:0.5
    })
    showDataTl.from('#weatherImage',{
        scale:1.1,
        repeat:-1,
        duration:2.5,
        yoyo:true,
        ease:'linear'
    })
       
 }

document.querySelector('#backToHome').addEventListener('click',()=>{
    error.style.display = 'none'
    weatherInfoContainer.style.display = 'none'     
    hero.style.display = 'flex'
    const cityName = document.querySelector('#cityName')
    cityName.value = ''
})
 

gsap.to('#hero img',{
    y: 30,
    duration:1.5,
    repeat:-1,
    ease:'power1.inOut',
    yoyo:true
})

gsap.to('#error img',{
    scale:1.2,
    yoyo:true,
    repeat:-1,
    ease:'power3.inOut'
})

gsap.to('.bg .cloud1',{
    x:150,
    repeat:-1,
    yoyo:true,
    duration:10,
    ease:'linear'
})
gsap.to('.bg .cloud2',{
    y:50,
    repeat:-1,
    yoyo:true,
    duration:4,
    ease:'linear'
})

