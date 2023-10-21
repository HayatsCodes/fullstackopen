import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

// let token = null

// const setToken = newToken => {
//   token = `bearer ${newToken}`
// }

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObj, token) => {
  console.log(`create - token: ${token}`)
  const config = {
    headers: {Authorization: `bearer ${token}`}
  }

  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

export default { getAll, create }