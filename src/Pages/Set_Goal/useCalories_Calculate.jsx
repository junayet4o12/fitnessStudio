import useBRM_Calculate from "./useBMR_Calculate";


const useCalories_Calculate = () => {
    const [userDetails, maleBMR, femaleBMR] = useBRM_Calculate()

    const sedentaryActive = (userDetails?.gender === "Male" && maleBMR * 1.2 )  || (userDetails?.gender === "Female" && femaleBMR * 1.2 )
    const lightlyActive = (userDetails?.gender === "Male" && maleBMR * 1.375 )  || (userDetails?.gender === "Female" && femaleBMR * 1.375 )
    const moderatelyActive = (userDetails?.gender === "Male" && maleBMR * 1.55 )  || (userDetails?.gender === "Female" && femaleBMR * 1.55 ) 
    const veryActive = (userDetails?.gender === "Male" && maleBMR * 1.725 )  || (userDetails?.gender === "Female" && femaleBMR * 1.725 ) 
    const extremelyActive = (userDetails?.gender === "Male" && maleBMR * 1.9 )  || (userDetails?.gender === "Female" && femaleBMR * 1.9 )

    return [sedentaryActive, lightlyActive, moderatelyActive, veryActive, extremelyActive]
};

export default useCalories_Calculate;