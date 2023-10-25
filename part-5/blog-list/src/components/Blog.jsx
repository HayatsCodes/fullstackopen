import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [view, setView] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const buttonStyle = {
    display: "inline-block",
    marginLeft: "5px",
    marginBottom: "1px",
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "800px",
  };

  const handleLikes = async () => {
    const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
    const updatedBlog = await blogService.update(
      blog.id,
      { likes: likes + 1 },
      user.token
    );
    setLikes(updatedBlog.likes);
  };

  return (
    <div style={blogStyle}>
      {!view ? (
        <>
          {blog.title} - <em>{blog.author}</em>
          <button
            style={buttonStyle}
            onClick={() => {
              setView(true);
            }}
          >
            View
          </button>
        </>
      ) : (
        <>
          {blog.title} - <em>{blog.author}</em>
          <button style={buttonStyle} onClick={() => setView(false)}>
            Hide
          </button>
          <br />
          <a href="">{blog.url}</a>
          <br />
          Likes {likes}
          <button style={buttonStyle} onClick={handleLikes}>
            Like
          </button>
          <br />
          {blog.author}
          <br />
        </>
      )}
    </div>
  );
};

export default Blog;
