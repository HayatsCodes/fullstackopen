import { useSelector, useDispatch } from "react-redux"
import { voteOf } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const regex = new RegExp(`${filter}`, "i")

  const vote = (id) => {
    dispatch(voteOf(id))
  }

  const filteredAnecdotes = !filter 
    ? anecdotes 
    : anecdotes.filter(anecdote => regex.test(anecdote.content))

  return (
    <>
      {filteredAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList