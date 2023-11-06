import axios from "axios"
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createAnecdotes = async (content) => {
    const response = await axios.post(baseUrl, {content, votes: 0})
    return response.data
}

export const voteAnecdote = async (anecdote) => {
    const response = await axios.patch(`${baseUrl}/${anecdote.id}`, {votes: anecdote.votes + 1})
    return response.data
}