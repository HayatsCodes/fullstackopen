import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    createAnecdote(state, action) {
      return state.concat(action.payload)
    },
    voteOf(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      console.log(anecdoteToChange)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a.id === id ? changedAnecdote : a)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteOf, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer