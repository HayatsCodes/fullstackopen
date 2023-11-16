import { useState } from 'react'
import blogService from '../services/blogs'
import { setMessage, setDisplay, setStatus } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { appendBlog } from '../reducers/blogsReducer'

const BlogForm = ({ updateFormVisibility, createBlog }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = async (event) => {
    try {
      console.log('before anything...')
      event.preventDefault()
      if (createBlog) {
        console.log('testing...')
        createBlog({ title, author, url })
        return
      }
      updateFormVisibility()
      const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
      const blog = await blogService.create({ title, author, url }, user.token)
      dispatch(appendBlog(blog))
      dispatch(setMessage(`A new blog '${title}' by ${author} added`))
      dispatch(setDisplay('show'))
      dispatch(setStatus('success'))
      setTimeout(() => {
        dispatch(setMessage(''))
        dispatch(setDisplay('hidden'))
        dispatch(setStatus(''))
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.error(error)
      dispatch(setMessage(error.message))
      dispatch(setDisplay('show'))
      dispatch(setStatus('error'))
      setTimeout(() => {
        dispatch(setMessage(''))
        dispatch(setDisplay('hidden'))
        dispatch(setStatus(''))
      }, 5000)
    }
  }



  return (
    <form onSubmit={addBlog}>
      <h3>Create New</h3>
      <div>
          <span>Title:</span>
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='title'
        />
      </div>
      <div>
          <span>Author:</span>
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='author'
        />
      </div>
      <div>
          <span>URL:</span>
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder='url'
        />
      </div><br />
      <button type="submit" id='create-blog-btn'>Create</button>
    </form>
  )
}

export default BlogForm