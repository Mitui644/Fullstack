import React, { useState } from 'react'

const Button = ({callBack, text}) => {
  return (
    <button onClick={callBack}>
    {text}
    </button>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const all = good + neutral + bad;

  if(all === 0)
  {
    return (
      <p>No feedback given</p>
    )
  } else {
    const average = (good * (1) + neutral * (0) + bad * (-1)) / all;
    const positive = (good / all) * 100;
    return (
      <>
      <StatisticsLine text="good" value={good}/>
      <StatisticsLine text="neutral" value={neutral}/>
      <StatisticsLine text="bad" value={bad}/>
      <StatisticsLine text="all" value={all}/>
      <StatisticsLine text="average" value={average}/>
      <StatisticsLine text="positive" value={positive.toString() + " %"}/>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button callBack={() => setGood(good + 1)} text="good"/>
      <Button callBack={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button callBack={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App