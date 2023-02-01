import { useEffect, useState } from "react"
import axios from "axios"

import CountryContent from "./components/CountryContent"

const Filter = ({handleInput, inputValue}) => (
    <div>
        Find countries: <input onChange={handleInput} value={inputValue} />
    </div>
)

const CountryEntry = ({handleClick, children}) => (
    <div>
        <span>{children} </span>
        <button onClick={() => handleClick(children)}>show</button>
    </div>
)

const App = () => {
    const [query, setQuery] = useState("")
    const [countries, setCountries] = useState(null)
    useEffect(() => {
        axios.get("http://localhost:3001/countries")
            .then(res => {
                setCountries(res.data)
            })
    },[])

    const handleQuery = (e) => {
        if (e.type === "change") {
            setQuery(e.target.value)
        } else {
            setQuery(e)
        }
    }
    const [countriesShown, setCountriesShown] = useState([])
    useEffect(() => {
        if (countries && query !== "") {
            setCountriesShown(countries.filter(country => country.toLowerCase().includes(query.toLowerCase())))
        }
        // eslint-disable-next-line
    },[query])
    
    const [countryContent, setCountryContent] = useState(null)
    useEffect(() => {
        if (countriesShown.find(country => country === query)) {
            axios.get(`https://restcountries.com/v3.1/name/${query}?fullText=true`)
                .then(res => {
                    setCountryContent(res.data[0])
                })
        } else if (countriesShown.length === 1) {
            axios.get(`https://restcountries.com/v3.1/name/${countriesShown[0]}?fullText=true`)
                .then(res => setCountryContent(res.data[0]))
        }
        // eslint-disable-next-line
    }, [countriesShown])

    return (
        <div>
            <Filter handleInput={handleQuery} inputValue={query} />
            {countriesShown.length <= 10
                ? <pre>{countriesShown.map(country => <CountryEntry key={country} handleClick={handleQuery}>{country}</CountryEntry>)}</pre>
                : <span>There are too many countries with this substring. Please refine your query.</span>
            }
            {countryContent === null ? null : (
                <CountryContent country={countryContent}/>
            )}
            
            {/* <List />
            <Content /> */}
        </div>
    )
}

export default App