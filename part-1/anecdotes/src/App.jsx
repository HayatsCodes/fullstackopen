/* eslint-disable react/prop-types */
import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const pointsArr = new Uint8Array(8);

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(pointsArr);
  const [highest, setHighest] = useState({point: 0, anecdote:anecdotes[selected]});


  const getRandomNumber = () => {
    return Math.floor(Math.random() * 8);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button
        onClick={() => {
          const copy = [...points]
          copy[selected] += 1
          setPoints(copy);
          if (copy[selected] >= highest.point) {
            const updatedPoint = points[selected] + 1
            setHighest({
              point: updatedPoint,
              anecdote: anecdotes[selected]
            })
          }
        }}
      >
        vote
      </button>
      <button onClick={() => setSelected(getRandomNumber())}>
        next anecdote
      </button>
      <h2>Anecdote with most votes</h2>
      <p>{highest.anecdote}</p>
      <p>has {highest.point} votes</p>
    </div>
  );
};

export default App;
