import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes
  })
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const regex = new RegExp(`${filter}`, "i")

  const vote = (id, votes, content) => {
    dispatch(voteAnecdote(id, votes))
    dispatch(setNotification(`You voted '${content}'`, 5000))
  }




  const filteredAnecdotes = !filter 
    ? anecdotes 
    : anecdotes.filter(anecdote => regex.test(anecdote.content))

  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <>
      {sortedAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.votes, anecdote.content)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList