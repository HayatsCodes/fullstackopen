import { useDispatch } from "react-redux" 
import { createAnecdote } from "../reducers/anecdoteReducer"
import { displayNotification } from "../reducers/notificationReducer"

const AnecdoteForm  = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(displayNotification(`You created '${content}'`))
        setTimeout(() => {
        dispatch(displayNotification(''))
        }, 5000)
    }

    return (
        <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    )
}

export default AnecdoteForm