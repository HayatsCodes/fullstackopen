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

const Paragraph = ({ text, counter }) => (
  <p>
    {text} {counter}
  </p>
);

// const Display = ({counter1, counter2, counter3}) => {
//   return (
//     <>
//      <Header text='statistics'/>
//     <p>good {counter1}</p>
//     <p>neutral {counter2}</p>
//     <p>bad {counter3}</p>
//     </>

//   )
// }

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
      {/* <Display counter1={good} counter2={neutral} counter3={bad} /> */}
      <Header text="statistics" />
      <Paragraph text="good" counter={good} />
      <Paragraph text="neutral" counter={neutral} />
      <Paragraph text="bad" counter={bad} />
      <Paragraph text="all" counter={all} />
      <Paragraph text="average" counter={average} />
      <Paragraph text="positive" counter={positive} />
    </div>
  );
};
export default App;
