import axios from "axios"
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = {content, votes: 0}
    const response = await axios.post(baseUrl, object)
    console.log('response: ', response.data)
    return response.data
}

const update = async (id, newObj) => {
    const response = await axios.patch(`${baseUrl}/${id}`, newObj)
    return response.data
}

export default { getAll, createNew, update }