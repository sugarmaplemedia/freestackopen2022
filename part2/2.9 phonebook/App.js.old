import { useEffect, useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 0 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
    ])
    const [personsToShow, setPersonsToShow] = useState([])
    useEffect(() => {
        setPersonsToShow(persons)
    }, [])

    const emptyPerson = {
        name: '',
        number: ''
    }
    const [newPerson, setNewPerson] = useState(emptyPerson)
    const addPerson = (e) => {
        e.preventDefault();
        if(!persons.find(person => person.name === newPerson.name)) {
            setPersons(persons.concat({...newPerson}))
        } else {
            alert(`A person named ${newPerson.name} is already in the phonebook!`)
        }
        setNewPerson(emptyPerson)
    }

    const filterText = (e) => {
        if (e.target.value === "") {
            setPersonsToShow(persons)
        } else {
            setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase())))
        }
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <div>
                <label htmlFor="filter">filter shown with </label>
                <input id="filter" onChange={filterText} />
            </div>
            <div>
                <h2>Add new</h2>
                <form onSubmit={addPerson}>
                    <div>
                        <label htmlFor="name">name: </label>
                        <input id="name" value={newPerson.name} onChange={(e) => setNewPerson({...newPerson, name: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="number">number: </label>
                        <input id="number" value={newPerson.number} onChange={(e) => setNewPerson({...newPerson, number: e.target.value})} />
                    </div>
                    <div>
                        <button type="submit">add</button>
                    </div>
                </form>
            </div>
            <div>
                <h2>Numbers</h2>
                {personsToShow.map(person => <p key={person.name}>{person.name}: {person.number}</p>)}
            </div>
        </div>
    )
}

export default App