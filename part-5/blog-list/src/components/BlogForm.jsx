import { useState } from 'react'
import blogService from '../services/blogs'
const BlogForm = ({ updateBlogs, updateNotification, updateFormVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    try {
      event.preventDefault()
      updateFormVisibility()
      const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
      const blog = await blogService.create({ title, author, url }, user.token)
      updateBlogs(blog)
      updateNotification({ display: 'show', status: 'success', message: `A new blog '${title}' by ${author} added` })
      setTimeout(() => {
        updateNotification({ display: 'hidden', status: '', message: '' })
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.error(error)
      updateNotification({ display: 'show', status: 'error', message: error.message })
      setTimeout(() => {
        updateNotification({ display: 'hidden', status: '', message: '' })
      }, 5000)
    }
  }

  return (
    <form onSubmit={addBlog}>
      <h3>Create New</h3>
      <div>
          Title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
          Author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
          URL:
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div><br />
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm