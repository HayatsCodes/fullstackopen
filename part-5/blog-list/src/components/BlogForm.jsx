const BlogForm = ({addBlog, title, author, url, handleTitle, handleAuthor, handleUrl}) => {
    return (
      <form onSubmit={addBlog}>
        <h3>Create New</h3>
        <div>
          Title:
          <input
            type="text" 
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div>
          Author:
          <input
            type="text" 
            value={author}
            onChange={handleAuthor}
          />
        </div>
        <div>
          URL:
          <input
            type="text" 
            value={url}
            onChange={handleUrl}
          />
        </div><br />
        <button type="submit">Create</button>
      </form>
    )
  }

export default BlogForm