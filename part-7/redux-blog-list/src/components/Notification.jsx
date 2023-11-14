import { useSelector } from 'react-redux';
const Notification = () => {
  const message = useSelector(state => state.notification.message)
  const display = useSelector(state => state.notification.display)
  const status = useSelector(state => state.notification.status)
  return (
    <>
      <p className={`${display} ${status}`}>{message}</p>
      <br /><br />
    </>
  )
}

export default Notification