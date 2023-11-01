import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blogs, blog, user, updateBlogs, updateNotification, onLike }) => {
  const [view, setView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  let testEnv
  if (onLike !== null) {
    testEnv = true
  } else {
    testEnv = false
  }
  const buttonStyle = {
    display: 'inline-block',
    marginLeft: '5px',
    marginBottom: '1px',
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '800px',
  }

  const handleLikes = async () => {
    const storedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    const updatedBlog = await blogService.update(
      blog.id,
      { likes: likes + 1 },
      storedUser.token
    )
    setLikes(updatedBlog.likes)
    const modifiedBlogs = blogs.map((b) => (b.id === blog.id ? updatedBlog : b));
    updateBlogs(modifiedBlogs)
  }

  const likeFn = testEnv ? onLike : handleLikes


  const handleRemove = async () => {
    try {
      if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
        const storedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
        console.log(`storedUser: ${storedUser}`)
        await blogService.remove(blog.id, storedUser.token)
        updateBlogs(null, blog.id)
      }
    } catch (error) {
      console.error(error)
      updateNotification({ display: 'show', status: 'error', message: error.message })
      setTimeout(() => {
        updateNotification({ display: 'hide', status: '', message: '' })
      }, 5000)
    }
  }

  return (
    <div style={blogStyle}>
      {!view ? (
        <div className='when-view-is-false'>
          {blog.title} - <em>{blog.author}</em>
          <button
            style={buttonStyle}
            onClick={() => {
              setView(true)
            }}
          >
            View
          </button>
        </div>
      ) : (
        <div className='when-view-is-true'>
          {blog.title} - <em>{blog.author}</em>
          <button style={buttonStyle} onClick={() => setView(false)}>
            Hide
          </button>
          <br />
          <a href={blog.url}>{blog.url}</a>
          <br />
          Likes {likes}
          <button style={buttonStyle} className='like' onClick={likeFn}>
            Like
          </button>
          <br />
          {blog.author}
          {blog.user.id === user.id
          ? <>
          <br />
          <button style={{ background: 'blue' }} onClick={handleRemove}>Remove</button>
          <br />
          </>
          : ''
        }
          
        </div>
      )}
    </div>
  )
}

export default Blog
