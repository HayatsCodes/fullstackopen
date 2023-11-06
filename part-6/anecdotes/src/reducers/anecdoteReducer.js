import anecdoteServices from '../services/anecdotes'
import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    voteOf(state, action) {
      const changedAnecdote = action.payload
      return state.map(a => a.id === changedAnecdote.id ? changedAnecdote : a)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, voteOf, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id, votes) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteServices.update(id, {votes: votes + 1})
    dispatch(voteOf(updatedAnecdote))
  }
}


export default anecdoteSlice.reducer