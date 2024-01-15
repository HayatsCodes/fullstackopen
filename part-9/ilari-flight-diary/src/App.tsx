import { useEffect, useState } from "react"
import axios from "axios";

enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}


const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries')
      .then(res => {
        setEntries(res.data)
      })
  }, [])
  return (
    <div className="app">
      <h1>Diary Entries</h1>
      {entries.length > 0 && entries.map(entry => {
        return <li key={entry.id}>
          <h3>{entry.date}</h3>
          <p>{entry.visibility}</p>
          <p>{entry.weather}</p>
        </li>
      })}
    </div>
  )
}

export default App