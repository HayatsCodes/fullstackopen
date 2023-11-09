/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useField } from './hooks'
import { 
  Link,
  Routes,
  Route,
  useMatch,
  useNavigate
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes ? anecdotes.map(anecdote => <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}><li>{anecdote.content}</li></Link>): ''}
    </ul>
  </div>
)

const Anecdote = ({anecdote}) => (
  <div>
    <h3>{anecdote.content}</h3>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a> </p>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is &quot;a story with a point.&quot;</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
  })
    navigate('/')
    props.showMessage(`a new anecdote '${content.value}' created`)
    setTimeout(() => {
      props.showMessage('')
    }, 5000)
  }

  const reset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input 
            value={content.value} 
            type={content.type}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input 
            value={author.value}
            type={author.type}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input 
            value={info.value} 
            type={info.type}
            onChange={info.onChange}
          />
        </div>
        <button>create</button>
      </form>
      <button onClick={() => {
        reset()
      }}>reset</button>
    </div>
  )
}

const Notification = ({message}) => {
  if (message) {
    return (
      <div>
        {message}
      </div>
    )
  }
  return null
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdoteById(Number(match.params.id)) : null
  const showMessage = (message) => {
    setNotification(message)
  }

  return (
    <>
      <h1>Software anecdotes</h1>
      <Notification message={notification}/>
      <Menu />
      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>} />
        <Route path='/create' element={<CreateNew addNew={addNew} showMessage={showMessage}/>} />
        <Route path='/about' element={<About />} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>} />
      </Routes>
    <Footer />
    </>
  )
}

export default App