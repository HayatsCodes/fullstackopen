import { useState } from 'react'
import blogService from '../services/blogs'
const BlogForm = ({ updateBlogs, updateNotification, updateFormVisibility, createBlog }) => {
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
      console.log('not testing...')
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