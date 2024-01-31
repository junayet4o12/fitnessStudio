import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "../../Redux/SingleUserSlice/singleUserSlice";
import useAuth from "../../Hooks/useAuth";

const BMR_Calculate = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { user: userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchSingleUser(user?.email));
  }, [dispatch, user]);

  const userAge = userDetails.birthDay && Math.floor((new Date() - new Date(userDetails.birthDay)) / 31556952000)
  const maleBMR = 88.362 + (13.397 * userDetails?.weight)+(4.799 * (userDetails?.height  * 2.54)) - (5.677 * userAge)
  const femaleBMR = 447.593 + ((9.247 * userDetails?.weight) + (3.098 * (userDetails?.height * 2.54))) - (4.330 * userAge)

  console.log(userDetails)
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 mt-5">
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Basal Metabolic Rate <span className="text-primary">(BMR)</span>
        </h1>
        <p className="text-base text-gray-600 font-medium mt-5">{`This guide goes beyond the basics, providing practical tips on calculating and utilizing your BMR to set realistic weight management goals. Uncover the relationship between BMR and calorie consumption, and learn how to strike a balance that fosters sustainable weight loss, maintenance, or muscle gain.`}</p>
        <p className="text-3xl md:text-4xl lg:text-xl font-bold mt-2">
          Your BMR is <span className="text-primary font-sans">{userDetails?.gender === "Male" && maleBMR.toFixed(2)}{userDetails?.gender === "Female" && femaleBMR.toFixed(2)}</span>{" "}
          Cal/Day.
        </p>
      </div>
      <div className="flex-1">
        <img
          src="https://i.ibb.co/HGpMMLB/BMR-img.png"
          className="w-full lg:w-[700px]"
          alt=""
        />
      </div>
    </div>
  );
};

export default BMR_Calculate;
