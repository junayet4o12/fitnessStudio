import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleSignIn from "../../../Components/GoogleSignIn/GoogleSignIn";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import { updateProfile } from "@firebase/auth";
import auth from "../../../firebase/firebase.config";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation()
  const axiosPublic = useAxiosPublic();
  const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
  const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Registering...");
    const image = { image: data?.image[0] };

    const res = await axios.post(imgHostingApi, image, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const imgurl = res?.data?.data?.display_url;
    const name = data?.name;
    const email = data?.email;
    const password = data?.password;
    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: imgurl,
        })
          .then(() => {
            console.log("user progile info updated");
            const userInfo = {
              name: data.name,
              email: data.email,
              image: imgurl
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                console.log(res?.data?.insertedId);
              }
            });
            toast.success("Register Successfully !", { id: toastId });
           
            navigate(location?.state? location?.state : '/')
          })
          .catch((err) => {
            toast.error(err?.code, { id: toastId });
          });
      })
      .catch((err) => {
        toast.error(err?.message, { id: toastId });
      });
  };

  return (
    <>
      <Helmet>
        <title>Register - Fitness Studio</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        <div>
          <div className="w-full md:w-[700px] lg:w-[400px] mb-10 lg:mb-0 px-5 lg:px-0">
            <div className="w-full">
              <div>
                <h1 className="text-start text-4xl font-semibold">
                  Create Account !
                </h1>
                <p className="text-start text-sm text-gray-600 mt-2">
                  Enter to get unlimited access to data & information.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 mt-5">
                  <div>
                    <h1 className="text-start text-sm font-medium mb-1">
                      Name <span className="text-red-500 text-xl">*</span>
                    </h1>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      placeholder="Enter your name"
                      className="input input-bordered w-full"
                    />
                    {errors.name && (
                      <span className="text-red-400 text-xs">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div>
                    <h1 className="text-start text-sm font-medium mb-1">
                      Email <span className="text-red-500 text-xl">*</span>
                    </h1>
                    <input
                      type="email"
                      {...register("email", {
                        required: true,
                      })}
                      placeholder="Enter your email address"
                      className="input input-bordered w-full"
                    />
                    {errors.email?.type === "required" && (
                      <span className="text-red-400 text-xs ">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div>
                    <h1 className="text-start text-sm font-medium mb-1">
                      Password <span className="text-red-500 text-xl">*</span>
                    </h1>
                    <input
                      type="password"
                      {...register("password", {
                        required: true,
                      })}
                      placeholder="Enter your password"
                      className="input input-bordered w-full"
                    />
                    {errors.password?.type === "required" && (
                      <span className="text-red-400 text-xs ">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="relative group border-2 border-dashed rounded-lg py-2 my-2">
                    <div className="flex items-center justify-center gap-5 absolute left-28  group-hover:cursor-pointer">
                      <FaCloudUploadAlt className="text-2xl"></FaCloudUploadAlt>
                      <h1 className="text-lg font-medium">Upload Photo</h1>
                    </div>
                    <input
                      type="file"
                      {...register("image", { required: true })}
                      className="w-full opacity-0  group-hover:cursor-pointer"
                    />
                  </div>
                  {errors.image?.type === "required" && (
                    <span className="text-red-400 text-xs ">
                      This field is required
                    </span>
                  )}
                  <button
                    className="duration-300 hover:rounded-3xl block w-full select-none rounded-lg bg-[#FF4804] py-3 px-6  text-center align-middle text-xl  text-white shadow-md shadow-[#FFA828]/20 transition-all hover:shadow-lg hover:shadow-[#FFA828]/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="submit"
                    data-ripple-light="true">
                    Register
                  </button>
                </div>
              </form>
              <div>
                <div className="divider text-gray-500">Or login with</div>
                <GoogleSignIn></GoogleSignIn>
                <div className="flex justify-center items-center gap-2">
                  <p className="text-gray-800 font-medium my-4 flex justify-center font-sans text-sm  leading-normal text-inherit antialiased">
                    {"Don't have an account?"}
                  </p>
                  <Link
                    to="/login"
                    className="block font-medium leading-normal text-[#FF4804] antialiased">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            className="w-[701px]"
            src="https://i.ibb.co/2Yp0RdD/Sign-up-pana.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Register;
