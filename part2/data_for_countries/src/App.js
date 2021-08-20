import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({name, capital, population, languages, flag, apiKey}) => {

  const [ weather, setWeather ] = useState({current: {temperature: "null", weather_icons: [], wind_speed: "null", wind_dir: "null"}})

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`)
      .then(response => {
        console.log('weather data received with api key and capital', apiKey, capital)
        setWeather(response.data)
      })
  }, [apiKey, capital])

  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h2>Languages</h2>
      <ul>
      {languages.map((language, index) => <li key={index}>{language}</li>)}
      </ul>
      <img src={flag} alt="Country flag" style={{width: "150px"}}></img>
      <h2>Weather in {capital}</h2>
      <p><b>temperature:</b> {weather.current.temperature} Celcius</p>
      {weather.current.weather_icons.map((icon, index) => <img key={index} src={icon} alt="Weather icon"></img>)}
      <p><b>wind:</b> {`${weather.current.wind_speed} kmh direction ${weather.current.wind_dir}`}</p>
    </div>
  )
}

const QueryResult = ({countries, viewCountryCallback, apiKey}) => {
  if(countries.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  } else if(countries.length > 1) {
    return (
      <>
      {countries.map(country => (
          <p key={country.name}>
            {country.name}
            <button onClick={() => viewCountryCallback(country.name)}>show</button>
          </p>
      ))}
      </>
    )
  } else if(countries.length === 1) {
    const country = countries[0]
    const languages = country.languages.map(language => language.name)
    return (
    <Country name={country.name} capital={country.capital} population={country.population} languages={languages} flag={country.flag} apiKey={apiKey}/>
    )
  } else {
    return (<p>No matches</p>)
  }
}

const App = () => {

  const api_key = process.env.REACT_APP_API_KEY

  const [ countries, setCountries ] = useState([])
  const [ input, setNewInput ] = useState('')
  const [ searchString, setNewSearchString ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleInputChange = (event) => {
    setNewInput(event.target.value)
    setNewSearchString(event.target.value)
  }

  const viewCountryCallback = (name) => {
    setNewSearchString(name)
  }

  const filteredCountries = countries.filter(country => {
    return country.name.toLowerCase().includes(searchString.toLowerCase())
  })

  return (
    <div>
    <div>
    find countries<input value={input} onChange={handleInputChange}/>
  </div>
  <QueryResult countries={filteredCountries} viewCountryCallback={viewCountryCallback} apiKey={api_key}/>
    </div>
  )
}

export default App
