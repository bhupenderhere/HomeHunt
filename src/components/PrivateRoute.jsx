import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()
  const location = useLocation()

  if(checkingStatus) {
    return <Spinner />
  }

  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' replace state={{ from: location }} />
}

export default PrivateRoute
