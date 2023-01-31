import { useEffect, useState } from "react"
import axios from "axios"

const Filter = ({handleInput, inputValue}) => (
    <div>
        Find countries: <input onChange={handleInput} value={inputValue} />
    </div>
)

const Country = ({handleClick, children}) => (
    <>
        <span onClick={handleClick}>{children}</span>
        <br />
    </>
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
            e.preventDefault()
            setQuery(e.target.innerText)
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
                ? <pre>{countriesShown.map(country => <Country key={country} handleClick={handleQuery}>{country}</Country>)}</pre>
                : <span>There are too many countries with this substring. Please refine your query.</span>
            }
            {countryContent === null ? null : (
                <div>
                    <h1>{countryContent.name.common}</h1>
                    <p>Capital: {countryContent.capital[0]}</p>
                    <p>Population: {countryContent.population}</p>
                    <h2>{Object.keys(countryContent.languages).length === 1 ? "Language" : "Languages"}</h2>
                    <ul>
                        {Object.entries(countryContent.languages).map(([key,value]) => <li key={key}>{value}</li>)}
                    </ul>
                    <img src={countryContent.flags.svg} alt={`Flag of ${countryContent.name.common}`} style={{"width": 500}} />
                </div>
            )}
            
            {/* <List />
            <Content /> */}
        </div>
    )
}

export default App