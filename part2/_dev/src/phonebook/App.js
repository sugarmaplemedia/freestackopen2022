import { useEffect, useState } from 'react'

const Filter = ({ handleFunction }) => (
    <div>
        <label htmlFor="filter">filter shown with </label>
        <input id="filter" onChange={handleFunction} />
    </div>
)

const AddNewPerson = ({ handleSubmit, handleName, handleNumber, personText }) => (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">name: </label>
                <input id="name" value={personText.name} onChange={handleName} />
            </div>
            <div>
                <label htmlFor="number">number: </label>
                <input id="number" value={personText.number} onChange={handleNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </div>
)

const List = ({list}) => (
    <div>
        {list.map(item => <p key={item.name}>{item.name}: {item.number}</p>)}
    </div>
)

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 0 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
    ])
    const [personsToShow, setPersonsToShow] = useState([])
    useEffect(() => {
        filterText()
    }, [persons])

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
        if (e === undefined || e.target.value === "") {
            setPersonsToShow(persons)
        } else {
            setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase())))
        }
    }

    const updateTempName = (e) => setNewPerson({...newPerson, name: e.target.value})
    const updateTempNumber = (e) => setNewPerson({...newPerson, number: e.target.value})

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter handleFunction={filterText} />
            <h2>Add new</h2>
            <AddNewPerson
                handleSubmit={addPerson}
                handleName={updateTempName}
                handleNumber={updateTempNumber}
                personText={{
                    name: newPerson.name,
                    number: newPerson.number
                }}
            />
            <h2>Numbers</h2>
            <List list={personsToShow} />
        </div>
    )
}

export default App