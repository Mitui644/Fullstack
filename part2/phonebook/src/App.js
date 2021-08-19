import React, { useState } from 'react'

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
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchString, setSearchString ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(obj => obj.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
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
