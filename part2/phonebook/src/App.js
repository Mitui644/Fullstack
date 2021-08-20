import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ text, callBack}) => (
  <div>
  filter shown with<input value={text} onChange={callBack}/>
</div>
)

const PersonForm = ({ submitCallBack, nameCallback, numberCallback, name, number}) => (
  <form onSubmit={submitCallBack}>
  <div>
    name: <input value={name} onChange={nameCallback}/>
  </div>
  <div>
    number: <input value={number} onChange={numberCallback}/>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
  </form>
)

const Persons = ({ persons }) => (
  persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
)

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchString, setSearchString ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(responseData => {
        setPersons(responseData)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(obj => obj.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        name: newName,
        number: newNumber
      }

      personService
      .create(person)
      .then(responseData => {
        setPersons(persons.concat(responseData))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchStringChange = (event) => {
    setSearchString(event.target.value)
  }

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(searchString.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter text={searchString} callBack={handleSearchStringChange}/>

      <h3>add a new</h3>

      <PersonForm submitCallBack={addPerson} nameCallback={handleNameChange} numberCallback={handleNumberChange} name={newName} number={newNumber}/>

      <h3>Numbers</h3>

      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App
