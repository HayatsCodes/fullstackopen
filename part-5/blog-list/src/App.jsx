import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./app.css";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [display, setDisplay] = useState("hidden");

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleTitle = ({ target }) => {
    setTitle(target.value);
  };
  const handleAuthor = ({ target }) => {
    setAuthor(target.value);
  };
  const handleUrl = ({ target }) => {
    setUrl(target.value);
  };

  const handleUsername = ({ target }) => {
    setUsername(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const returnedUser = await loginService.login({ username, password });
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(returnedUser)
      );
      // blogService.setToken(returnedUser.token)
      setUser(returnedUser);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setDisplay("show");
      setStatus("error");
      setStatusMsg("wrong username or password");
      setTimeout(() => {
        setDisplay("hidden");
        setStatus("");
        setStatusMsg("");
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    console.log(`Logging out ${user.username}`);
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const addBlog = async (event) => {
    try {
      event.preventDefault();
      blogFormRef.current.toggleVisibility()
      const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
      const blog = await blogService.create({ title, author, url }, user.token);
      setBlogs(blogs.concat(blog));
      setDisplay("show");
      setStatus("success");
      setStatusMsg(`A new blog '${title}' by ${author} added`);
      setTimeout(() => {
        setDisplay("hidden");
        setStatus("");
        setStatusMsg("");
      }, 5000);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      console.error(error);
      setDisplay("show");
      setStatus("error");
      setStatusMsg(error.message);
      setTimeout(() => {
        setDisplay("hidden");
        setStatus("");
        setStatusMsg("");
      }, 5000);
    }
  };

  return (
    <div>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleLogin={handleLogin}
          display={display}
          status={status}
          statusMessage={statusMsg}
        />
      ) : (
        <>
          <h2>Blogs</h2>
          <Notification display={display} status={status} message={statusMsg} />
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <br />
          <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
            <BlogForm
              addBlog={addBlog}
              title={title}
              url={url}
              author={author}
              handleTitle={handleTitle}
              handleAuthor={handleAuthor}
              handleUrl={handleUrl}
            />
          </Togglable>
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;