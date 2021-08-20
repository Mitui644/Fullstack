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

const Persons = ({ persons, deleteCallback }) => (
  persons.map(person => 
  <p key={person.id}>
    {person.name} {person.number} <button onClick={() => deleteCallback(person.id, person.name)}>delete</button>
  </p>
  )
)

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  const className = notification.isError ? "error" : "note"
  return (
    <div className={className}>
      {notification.message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchString, setSearchString ] = useState('')
  const [notification, setNotification] = useState({message: null, isError: false})

  const showNotification = (message, isError) => {
    setNotification({message, isError})
    setTimeout(() => {
      setNotification({message: null, isError: false})
    }, 5000)
  }
  
  useEffect(() => {
    personService
      .getAll()
      .then(responseData => {
        setPersons(responseData)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(obj => obj.name === newName)

    if(existingPerson && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const updatedPerson = { ...existingPerson, number: newNumber}
      personService
      .update(updatedPerson)
      .then(responseData => {
        setPersons(persons.map(person => person.id !== existingPerson.id ? person : responseData))
        setNewName('')
        setNewNumber('')
        showNotification(`Updated ${newName}`, false)
      })
    } else if(!existingPerson) {
      const person = { name: newName, number: newNumber } 
      personService
      .create(person)
      .then(responseData => {
        setPersons(persons.concat(responseData))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${newName}`, false)
      })
    }
  }

  const removePerson = (id, name) => {
    const message = `Delete ${name} ?`
    const result = window.confirm(message);
    if(result) {
      personService
      .remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      showNotification(`Removed ${name}`, false)
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

      <Notification notification={notification} />

      <Filter text={searchString} callBack={handleSearchStringChange}/>

      <h3>add a new</h3>

      <PersonForm submitCallBack={addPerson} nameCallback={handleNameChange} numberCallback={handleNumberChange} name={newName} number={newNumber}/>

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} deleteCallback={removePerson}/>
    </div>
  )
}

export default App
