import { Navigate, useLocation } from 'react-router';
import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth'
import { signOut } from '@firebase/auth';
import auth from '../firebase/firebase.config';
const AdminRouts = ({children}) => {
    const { user, loading } = useAuth()
    const [isAdmin, isAdminPanding] = useAdmin();
    const location = useLocation()

    if (loading || isAdminPanding) {
        return 'loading'
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