import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const GoogleSignIn = () => {
  const { googleLogIn } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handleGoogleLogin = () => {
    const toastId = toast.loading("Logging...");
    googleLogIn()
      .then((res) => {
        navigate("/");
        toast.success("Logged in successfully", { id: toastId });
        const userInfo = {
          email: res?.user?.email,
          name: res?.user?.displayName,
          image: res?.user?.photoURL,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res?.data);
        });
      })
      .catch((err) => {
        toast.error(err?.code, { id: toastId });
      });
  };
  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline btn-info normal-case w-full">
        <FcGoogle className="text-xl"></FcGoogle>Login With Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
