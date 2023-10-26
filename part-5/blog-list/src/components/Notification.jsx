const Notification = ({ display, status, message }) => {
  return (
    <>
      <p className={`${display} ${status}`}>{message}</p>
      <br /><br />
    </>
  )
}

export default Notification