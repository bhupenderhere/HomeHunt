import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'
import AuthRequiredModal from './AuthRequiredModal'

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()
  const location = useLocation()
  const navigate = useNavigate()

  if(checkingStatus) {
    return <Spinner />
  }

  if (loggedIn) {
    return <Outlet />
  }

  return (
    <AuthRequiredModal
      open
      onClose={() => navigate("/", { replace: true })}
      redirectPath={`${location.pathname}${location.search}${location.hash}`}
    />
  )
}

export default PrivateRoute
