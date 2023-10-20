import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername ] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>Login to Application</h2>
        <div>
          Username: 
          <input 
          type="text"
          value={username}
          onChange={({target}) => setUsername(target.value)}
        />
        </div>
        <div>
          Password: 
          <input
          type="password"
          value={password}
          onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    )
}


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const returnedUser = await loginService.login({username, password})
      console.log(returnedUser)
      setUser(returnedUser)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
     {user === null 
       ? loginForm()
     : (
      <>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
    )}
      
    </div>
  )
}

export default App