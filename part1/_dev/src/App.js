import { useState } from 'react'

const anecdotes = [
    ['If it hurts, do it more often.', 0],
    ['Adding manpower to a late software project makes it later!', 0],
    ['The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', 0],
    ['Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', 0],
    ['Premature optimization is the root of all evil.', 0],
    ['Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', 0],
    ['Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', 0],
    ['The only way to go fast, is to go well.', 0]
]
let mostVotedAnecdoteIndex = 0;

const App = () => {
    const [anecdote, setAnecdote] = useState({
        quote: 'If it hurts, do it more often.',
        votes: 0,
        index: 0
    })

    mostVotedAnecdoteIndex = anecdotes.reduce((mostVoted, newAnecdote) => anecdotes[mostVoted][1] < newAnecdote[1] ? anecdotes.indexOf(newAnecdote) : mostVoted, 0)

    const getRandomAnecdote = () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * anecdotes.length)
        } while (randomIndex === anecdote.index)
        
        setAnecdote({
            quote: anecdotes[randomIndex][0],
            votes: anecdotes[randomIndex][1],
            index: randomIndex
        })
    }

    const voteAnecdote = () => {
        anecdotes[anecdote.index][1] += 1

        setAnecdote({
            ...anecdote,
            votes: anecdote.votes + 1
        })
    }

    return (
        <div>
            <h1>Anecdote of the Day</h1>
            <p>{anecdote.quote}</p>
            <p>votes: {anecdote.votes}</p>
            <button onClick={voteAnecdote}>vote</button>
            <button onClick={getRandomAnecdote}>next anecdote</button>

            <h2>Anecdote with the most votes</h2>
            <p>{anecdotes[mostVotedAnecdoteIndex][0]}</p>
            <p>Votes: {anecdotes[mostVotedAnecdoteIndex][1]}</p>
        </div>
    )
}

export default App