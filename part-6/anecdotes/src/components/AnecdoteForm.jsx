import { useDispatch } from "react-redux" 
import { createAnecdote } from "../reducers/anecdoteReducer"
import { displayNotification } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm  = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        anecdoteService.createNew(content).then(anecdote => {
            dispatch(createAnecdote(anecdote))
            dispatch(displayNotification(`You created '${anecdote.content}'`))
            setTimeout(() => {
            dispatch(displayNotification(''))
            }, 5000)
        })
    }

    return (
        <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    )
}

export default AnecdoteForm