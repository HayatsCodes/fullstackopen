import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername ] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

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

const blogForm = () => {
  return (
    <form onSubmit={addBlog}>
      <h3>Create New</h3>
      <div>
        Title:
        <input
          type="text" 
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text" 
          value={author}
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          type="text" 
          value={url}
          onChange={({target}) => setUrl(target.value)}
        />
      </div><br />
      <button type="submit">Create</button>
    </form>
  )
}

const handleLogin = async event => {
  event.preventDefault()

  try {
    const returnedUser = await loginService.login({username, password})
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(returnedUser)
    )
    // blogService.setToken(returnedUser.token)
    setUser(returnedUser)
    setUsername('')
    setPassword('')
  } catch (error) {
    console.error(error)
  }
}

  const handleLogout = (event) => {
    event.preventDefault()
    console.log(`Logging out ${user.username}`)
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null);
  }

  const addBlog = async (event) => {
    try {
      event.preventDefault()
      const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
      const blog = await blogService.create({title, author, url}, user.token)
      console.log(`blog: ${blog}`)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
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
        <h2>Blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        <br />
        {blogForm()}
        <br />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
    )}
      
    </div>
  )
}

export default App