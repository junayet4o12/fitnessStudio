import { Navigate, useLocation } from 'react-router';
import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth'
import { signOut } from '@firebase/auth';
import auth from '../firebase/firebase.config';
import Loading from '../Components/Loading';
const AdminRouts = ({children}) => {
    const { user, loading } = useAuth()
    const [isAdmin, isAdminPanding] = useAdmin();
    const location = useLocation()

    if (loading || isAdminPanding) {
        return <Loading></Loading>
    }
    if (user && isAdmin) {
        return <div>
            {children}
        </div>

    }
    signOut(auth)
    return <Navigate to={'/login'} state={{ from: location }}></Navigate>;
   
};

export default AdminRouts;