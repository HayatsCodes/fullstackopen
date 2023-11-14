import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './app.css'
import Notification from './components/Notification'
import { setMessage, setDisplay, setStatus } from './reducers/notificationReducer'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notify, setNotify] = useState({ display: 'hidden', status: '', message: '' })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])


  const handleUsername = ({ target }) => {
    setUsername(target.value)
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const returnedUser = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(returnedUser)
      )
      setUser(returnedUser)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error)
      dispatch(setMessage('wrong username or password'))
      dispatch(setDisplay('show'))
      dispatch(setStatus('error'))
      setTimeout(() => {
        dispatch(setMessage(''))
        dispatch(setDisplay('hidden'))
        dispatch(setStatus(''))
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log(`Logging out ${user.username}`)
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const updateBlogs = (newBlog, id=null) => {
    if (Array.isArray(newBlog)) {
      setBlogs(newBlog)
      return;
    }
    newBlog
      ? setBlogs(blogs.concat(newBlog))
      : setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const updateNotification = newNotification => {
    setNotify(newNotification)
  }

  const updateFormVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleLogin={handleLogin}
        />
      ) : (
        <div className='blogs'>
          <h2>Blogs</h2>
          <Notification />
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <br />
          <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
            <BlogForm
              updateBlogs={updateBlogs}
              updateNotification={updateNotification}
              updateFormVisibility={updateFormVisibility}
              onCreate={null}
            />
          </Togglable>
          <br />
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blogs={blogs}
                blog={blog}
                user={user}
                updateBlogs={updateBlogs}
                onLike={null}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App