import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObj, token) => {

  const config = {
    headers: {Authorization: `bearer ${token}`}
  }

  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const update = async (id, newObj, token) => {
  const config = {
    headers: {Authorization: `bearer ${token}`}
  }

  const response = await axios.patch(`${baseUrl}/${id}`, newObj, config)
  return response.data
}

export default { getAll, create, update }