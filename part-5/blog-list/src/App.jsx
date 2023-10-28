import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './app.css'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
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
      setNotify({ display: 'show', status: 'error', message: 'wrong username or password' })
      setTimeout(() => {
        setNotify({ display: 'hidden', status: '', message: '' })
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
          display={notify.display}
          status={notify.status}
          statusMessage={notify.message}
        />
      ) : (
        <>
          <h2>Blogs</h2>
          <Notification display={notify.display} status={notify.status} message={notify.message} />
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
                blog={blog}
                updateBlogs={updateBlogs}
                updateNotification={updateNotification}
                onLike={null}
              />
            ))}
        </>
      )}
    </div>
  )
}

export default App