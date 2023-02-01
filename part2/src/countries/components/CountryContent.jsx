import { useEffect, useState } from "react"
import axios from "axios"

// Geocode: http://api.openweathermap.org/geo/1.0/direct?q={city}&limit={limit}&appid={API_KEY}
// Weather: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}

const CountryContent = ({country, withWeather = false}) => {
    const [geocode, setGeocode] = useState(null)
    useEffect(() => {
        if (withWeather) {
            axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&limit=2&appid=${process.env.WEATHER_API_KEY}`)
            .then(res => setGeocode(
                {
                    lat: res.data.lat,
                    lon: res.data.lon
                }
            ))
        }
    }, [])
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        if (withWeather) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${geocode.lat}&lon=${geocode.lat}&units=imperial&appid=${process.env.WEATHER_API_KEY}`)
            .then(res => setWeather(
                {
                    temp: res.data.main.temp,
                    windSpeed: res.data.wind.speed,
                    cloudCoverage: res.data.clouds.all
                }
            ))
        }
    },[geocode])

    return (
        <div>
            <section>
                <h1>{country.name.common}</h1>
                <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} style={{"width": 200}} />
                <p>Capital: {country.capital[0]}</p>
                <p>Population: {country.population}</p>
            </section>
            <section>
                <h2>{Object.keys(country.languages).length === 1 ? "Language" : "Languages"}</h2>
                <ul>
                    {Object.entries(country.languages).map(([key,value]) => <li key={key}>{value}</li>)}
                </ul>
            </section>
            <section>
                <h2>Weather in {country.capital[0]}</h2>
                {weather === null
                    ? <p>Weather is currently deactivated</p>
                    : (
                        <>
                            <p>Temperature: {weather.temp} degrees Fahrenheit</p>
                            <p>Wind speed: {weather.windSpeed} miles per hour</p>
                            <p>Cloud Coverage: {weather.cloudCoverage}%</p>
                        </>
                    )
                }
            </section>
        </div>
    )
}

export default CountryContent