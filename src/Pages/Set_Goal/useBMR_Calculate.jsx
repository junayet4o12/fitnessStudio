import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../Hooks/useAuth";
import { useEffect } from "react";
import { fetchSingleUser } from "../../Redux/SingleUserSlice/singleUserSlice";

const useBRM_Calculate = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { user: userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchSingleUser(user?.email));
  }, [dispatch, user]);

  const userAge =
    userDetails.birthDay &&
    Math.floor((new Date() - new Date(userDetails.birthDay)) / 31556952000);
  const maleBMR =
    88.362 +
    13.397 * userDetails?.weight +
    4.799 * (userDetails?.height * 2.54) -
    5.677 * userAge;
  const femaleBMR =
    447.593 +
    (9.247 * userDetails?.weight + 3.098 * (userDetails?.height * 2.54)) -
    4.33 * userAge;

  return [userDetails, maleBMR, femaleBMR];
};

export default useBRM_Calculate;
