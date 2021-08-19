import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({name, capital, population, languages, flag}) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h2>languages</h2>
      <ul>
      {languages.map((language, index) => <li key={index}>{language}</li>)}
      </ul>
      <img src={flag} alt="Country flag" style={{width: "150px"}}></img>
    </div>
  )
}

const QueryResult = ({countries}) => {
  if(countries.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  } else if(countries.length > 1) {
    return (countries.map(country => <p key={country.name}>{country.name}</p>))
  } else if(countries.length === 1) {
    const country = countries[0]
    const languages = country.languages.map(language => language.name)
    return (
    <Country name={country.name} capital={country.capital} population={country.population} languages={languages} flag={country.flag}/>
    )
  } else {
    return (<p>No matches</p>)
  }
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ input, setNewInput ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleInputChange = (event) => {
    setNewInput(event.target.value)
  }

  const filteredCountries = countries.filter(country => {
    return country.name.toLowerCase().includes(input.toLowerCase())
  })

  return (
    <div>
    <div>
    find countries<input value={input} onChange={handleInputChange}/>
  </div>
  <QueryResult countries={filteredCountries}/>
    </div>
  )
}

export default App
