import PropTypes from 'prop-types'
import useAuth from '../Hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
// import { Spinner } from "@material-tailwind/react";
import { InfinitySpin } from 'react-loader-spinner';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) {
    return <div className='h-screen flex items-center justify-center'>
      {/* <Spinner className="h-16 w-16 text-gray-900/50" /> */}
      <InfinitySpin
        visible={true}
        width="300"
        color="#FF4804"
        ariaLabel="infinity-spin-loading"
      />
    </div>
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
