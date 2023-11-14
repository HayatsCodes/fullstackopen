import Notification from './Notification'
const LoginForm = ({ username, password, handleLogin, handleUsername, handlePassword, display, status, statusMessage }) => {
  return (
    <form onSubmit={handleLogin} className='login-form'>
      <h2>Login to Application</h2>
      <Notification display={display} status={status} message={statusMessage}/>
      <div>
          <span>Username:</span>
        <input
          type="text"
          value={username}
          onChange={handleUsername}
        />
      </div>
      <div>
      <span>Password:</span>
        <input
          type="password"
          value={password}
          onChange={handlePassword}
        />
      </div>
      <button type="submit" id='login-btn'>Login</button>
    </form>
  )
}

export default LoginForm