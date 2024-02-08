import PropTypes from 'prop-types'
import useAuth from '../Hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import Loading from '../Components/Loading';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) {
    return <Loading></Loading>
  }
  if (!loading && user) {
    return children
  }
  return <Navigate to={'/login'} state={location.pathname} replace></Navigate>
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired


}

export default PrivateRoute
