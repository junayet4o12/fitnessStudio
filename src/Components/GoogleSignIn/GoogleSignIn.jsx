import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const GoogleSignIn = () => {
  const { googleLogIn } = useAuth()
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()
  const handleGoogleLogin = () => {
    googleLogIn()
      .then(res => {
        console.log(res.user);
        const userInfo = {
          email: res?.user?.email,
          name: res?.user?.displayName,
          image: res?.user?.photoURL
        }
        axiosPublic.post('/users', userInfo)
          .then(res => {
            console.log(res?.data);
            Swal.fire({
              icon: "success",
              title: "Logged in successfully!!",
              timer: 1500
            });
            navigate('/')
          })


      })
      .catch(err => {
        console.log(err);
      })
   
  }
  return (
    <div>
      <button onClick={handleGoogleLogin} className="btn btn-outline btn-info normal-case w-full">
        <FcGoogle className="text-xl"></FcGoogle>Login With Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
