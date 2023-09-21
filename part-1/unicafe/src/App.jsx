/* eslint-disable react/prop-types */
import { useState } from "react";

const Header = ({ text }) => (
  <>
    <h2>{text}</h2>
  </>
);

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, counter }) => (
  <p>
    {text} {counter}
  </p>
);

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if (all === 0) {
    return (
      <div>
      <Header text="statistics" />
      <p>No feedback given</p>
      </div>
      )
  }
  return (
    <div>
      <Header text="statistics" />
      <StatisticLine text="good" counter={good} />
      <StatisticLine text="neutral" counter={neutral} />
      <StatisticLine text="bad" counter={bad} />
      <StatisticLine text="all" counter={all} />
      <StatisticLine text="average" counter={average} />
      <StatisticLine text="positive" counter={positive} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState("0%");

  const handleGoodClick = () => {
    const updatedAll = all + 1
    const updatedGood = good + 1
    const updatedAverage = ((updatedGood * 1) + (bad * -1)) / updatedAll
    const updatedPositive = (updatedGood / updatedAll) * 100


    setGood(updatedGood)
    setAll(updatedAll)
    setAverage(updatedAverage)
    setPositive(`${updatedPositive}%`)
  };
  
  const handleNeutralClick = () => {
    const updatedAll = all + 1
    const updatedNeutral = neutral + 1
    const updatedAverage = ((good * 1) + (bad * -1)) / updatedAll
    const updatedPositive = (good / updatedAll) * 100

    setNeutral(updatedNeutral);
    setAll(updatedAll)
    setAverage(updatedAverage)
    setPositive(`${updatedPositive}%`)

  };

  const handleBadClick = () => {
    const updatedAll = all + 1
    const updatedBad = bad + 1
    const updatedAverage = ((good * 1) + (updatedBad * -1)) / updatedAll
    const updatedPositive = (good / updatedAll) * 100

    setBad(updatedBad);
    setAll(updatedAll)
    setAverage(updatedAverage)
    setPositive(`${updatedPositive}%`)

  };

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics 
      good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}
      />
    </div>
  );
};
export default App;
