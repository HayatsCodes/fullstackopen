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
  const [dateInput, setDateInput] = useState('')
  const [weatherInput, setWeatherInput] = useState('')
  const [visibilityInput, setVisibilityInput] = useState('')
  const [commentInput, setCommentInput] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const baseUrl: string = ('http://localhost:3000/api/diaries')


  useEffect(() => {
    axios.get<DiaryEntry[]>(baseUrl)
      .then(res => {
        setEntries(res.data)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post<DiaryEntry>(baseUrl, {
        date: dateInput,
        weather: weatherInput,
        visibility: visibilityInput,
        comment: commentInput
      });
      setEntries(entries.concat(response.data))
      setDateInput('')
      setWeatherInput('')
      setCommentInput('')
      setVisibilityInput('')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data)
        setTimeout(() => {
          setErrorMsg('')
        }, 5000);
      }
    }

  }
  return (
    <div className="app">
      <form onSubmit={handleSubmit} className="form">
        <h2>Add new Entry</h2>
        {errorMsg && (<p className="error"> {errorMsg} </p>)}
        <label>
          Date: <input type="date" value={dateInput} onChange={({ target }) => setDateInput(target.value)} />
        </label>
        <label>
          Visibility: {' '}
          <label>
            great <input type="radio" checked={visibilityInput === 'great'} value='great' onChange={({ target }) => setVisibilityInput(target.value)} />
          </label>
          <label>
            good <input type="radio" checked={visibilityInput === 'good'} value='good' onChange={({ target }) => setVisibilityInput(target.value)} />
          </label>
          <label>
            ok <input type="radio" checked={visibilityInput === 'ok'} value='ok' onChange={({ target }) => setVisibilityInput(target.value)} />
          </label>
          <label>
            poor <input type="radio" checked={visibilityInput === 'poor'} value='poor' onChange={({ target }) => setVisibilityInput(target.value)} />
          </label>
        </label>
        <label>
          Weather:
          <label>
            sunny <input type="radio" checked={weatherInput === 'sunny'} value='sunny' onChange={({ target }) => setWeatherInput(target.value)} />
          </label>
          <label>
            rainy <input type="radio" checked={weatherInput === 'rainy'} value='rainy' onChange={({ target }) => setWeatherInput(target.value)} />
          </label>
          <label>
            cloudy <input type="radio" checked={weatherInput === 'cloudy'} value='cloudy' onChange={({ target }) => setWeatherInput(target.value)} />
          </label>
          <label>
            stormy <input type="radio" checked={weatherInput === 'stormy'} value='stormy' onChange={({ target }) => setWeatherInput(target.value)} />
          </label>
          <label>
            windy <input type="radio" checked={weatherInput === 'windy'} value='windy' onChange={({ target }) => setWeatherInput(target.value)} />
          </label>
        </label>
        <label>
          Comment: <input type="text" value={commentInput} onChange={({ target }) => setCommentInput(target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <h2>Diary Entries</h2>
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