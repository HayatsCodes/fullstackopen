/* eslint-disable react/prop-types */
import { useState } from 'react'

const Header = ({text}) => <><h2>{text}</h2></>

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Display = ({counter1, counter2, counter3}) => {
  return (
    <>
     <Header text='statistics'/>
    <p>good {counter1}</p>
    <p>neutral {counter2}</p>
    <p>bad {counter3}</p>
    </>
   
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)


  return (
    <div>
      <Header text='give feedback'/>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Display counter1={good} counter2={neutral} counter3={bad} />
    </div>
  )
}
export default App
