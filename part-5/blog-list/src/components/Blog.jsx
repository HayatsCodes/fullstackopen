import { useState } from 'react'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const buttonStyle = {
    display: 'inline-block', 
    marginLeft: '5px',
    marginBottom: '1px'
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    maxWidth: '800px'
  }

  return (
    <div style={blogStyle}>
     { !view 
      ?
      <>
      {blog.title} - <em>{blog.author}</em>
      <button style={buttonStyle} onClick={() => setView(true)}>View</button>
      </>
      :
      <>
      {blog.title} - <em>{blog.author}</em>
      <button style={buttonStyle} onClick={() => setView(false)}>Hide</button>
      <br />
      {blog.url}
      <br />
      Likes {blog.likes}
      <button style={buttonStyle}>Like</button>
      <br />
      {blog.author}
      <br />
      </>
    }
    </div>
  );
};

export default Blog;
