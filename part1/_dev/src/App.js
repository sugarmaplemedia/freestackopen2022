import { useState } from 'react'

const Button = ({state, setter, children}) => {
    const updateFeedback = () => {
        setter(state += 1);
    }

    return (
        <button onClick={updateFeedback}>{children}</button>  
    )
}

const StatisticLine = ({title, count}) => (
    <tr>
        <td>{title}</td>
        <td>{count}</td>
    </tr>
)

const Statistics = ({feedbackCount, counterArray}) => {
    if (feedbackCount > 0) {
        return (
            <table>
                <tbody>
                    {counterArray.map(counter => (
                        <StatisticLine key={counter[0]} title={counter[0]} count={counter[1]} />
                    ))}
                </tbody>
            </table>
        )
    } else {
        return <p>no feedback given</p>
    }
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    let all = good + neutral + bad

    return (
        <div>
            <h1>Give feedback</h1>
            <Button setter={setGood} state={good}>good</Button>
            <Button setter={setNeutral} state={neutral}>neutral</Button>
            <Button setter={setBad} state={bad}>bad</Button>
            <h2>Statistics</h2>
            <Statistics feedbackCount={all} counterArray={
                [
                    ["good", good],
                    ["neutral", neutral],
                    ["bad", bad],
                    ["all", all],
                    ["average", `${all === 0 ? "no feedback" : (good - bad) / all}`],
                    ["positive", `${all === 0 ? "no feedback" : (good / all * 100) + "%"}`]
                ]
            } />
        </div>
    )
}

export default App