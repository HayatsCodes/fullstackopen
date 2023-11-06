import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdotes } from '../services/anecdotes'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient =  useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: () => {
      dispatch({type: 'SET_NOTIFICATION', payload: 'Anecdote must be 5 or more characters long'})
    setTimeout(() => {
      dispatch({type: 'SET_NOTIFICATION', payload: ''})
    }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
    dispatch({type: 'SET_NOTIFICATION', payload: `You created '${content}'`})
    setTimeout(() => {
      dispatch({type: 'SET_NOTIFICATION', payload: ''})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
