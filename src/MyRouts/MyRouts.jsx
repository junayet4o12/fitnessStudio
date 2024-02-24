// import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import LogIn from "../Pages/AuthPages/LogIn/LogIn";
import Register from "../Pages/AuthPages/Register/Register";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ConnectApp from "../Pages/ConnectApp/ConnectApp";
import Profile from "../Components/Profile/Profile";

import BmiCalculator from "../Pages/BMI_Calculator/BmiCalculator";
import SetGoal from "../Pages/Set_Goal/SetGoal";
import CreateGoal from "../Pages/Set_Goal/CreateGoal";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Blogpage from "../Pages/BlogPage/Blogpage";
import PrivateRoute from "./PrivateRoute";
import DynamicBlogpage from "../Pages/DynamicBlogpage/DynamicBlogpage";
import UploadBlogs from "../Pages/UploadBlogs/UploadBlogs";
import FitbitTerms from "../Components/Terms & Conditions/FitbitTerms";
import MyBlogs from "../Components/MyBlogs/MyBlogs";
import StravaCondition from "../Pages/ConnectApp/Strava/StravaCondition";
import UsersBlog from "../Pages/UsersBlog/UsersBlog";
import DynamicBlogpage2 from "../Pages/DynamicBlogpage/DynamicBlogpage2";
import StravaActivities from "../Components/StravaActivities/StravaActivities";
import CompareActivity from "../Components/StravaActivities/CompareActivity";
import SpecialRecipe from "../Pages/SpecialRecipe/SpecialRecipe";
import AdminRouts from "./AdminRouts";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import ManageUsers from "../AdminDashboard/ManageUsers";
import MangeBlogPage from "../Pages/ManageBlogPage/MangeBlogPage";
import ConnectPeople from "../Components/ConnectPeople/ConnectPeople";
import ConnectedPeople from "../Components/ConnectedPeople/ConnectedPeople";
import WorkoutLibrary from "../Pages/Workout Library/WorkoutLibrary";
import ManageWeight from "../Pages/Set_Goal/ManageWeight";
import StrengthTraining from "../Pages/Set_Goal/StrengthTraining";
import Endurance from "../Pages/Set_Goal/Endurance";
import Chat from "../Components/Chat";
import TrackProgress from "../Pages/TrackProgress/TrackProgress";
import GoalTrackingPage from "../GoalTracking/GoalTrackingPage";
import Message from "../Components/Message/Message";
import ProductFrom from "../Pages/ProductFoems/ProductFrom";
import ProductsCollections from "../Pages/ProductsCollections/ProductsCollections";
import UserProfile from "../Components/UserProfile/UserProfile";
import UpdateBlogs from "../Components/MyBlogs/UpdateBlogs";
import DynamicProductPage from "../Pages/DynamicProductPage/DynamicProductPage";
import ProductsForAdmin from "../Pages/ProductsForAdmin/ProductsForAdmin";
import UpdateProductForm from "../Pages/UpdateProductForm/UpdateProductForm";
import { backendUrl } from "../BackendUrl/backendUrl";
import Shop from "../Pages/Shop/Shop";
import Feedback from "../Pages/Feedback/Feedback";
import AddEvent from "../Pages/Event/AddEvent";
import AllEvents from "../Pages/Event/AllEvents";


const axiosPublic = useAxiosPublic();


const MyRouts = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about_us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/blogs",
        loader: () => axiosPublic("/blogcount"),
        element: (
          <PrivateRoute>
            <Blogpage />
          </PrivateRoute>
        ),
      },
      {
        path: "/library",
        element: <WorkoutLibrary />,
      },
      {
        path: "/specialRecipe",
        element: (
          <PrivateRoute>
            {" "}
            <SpecialRecipe />
          </PrivateRoute>
        ),
      },
      {
        path:"/shop",
        element: <Shop/>
      },
      {
        path:"/shop/:id",
        element: <DynamicProductPage/>
      },
      {
        path: "/chat",
        element: (
          <PrivateRoute>
            <Chat></Chat>
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs/:id",
        element: (
          <PrivateRoute>
            <DynamicBlogpage />
          </PrivateRoute>
        ),
      },
      {
        path: "/userProfile/:email",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs/:id/:email",
        element: (
          <PrivateRoute>
            <UsersBlog />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs/:id/:email/:newId",
        element: (
          <PrivateRoute>
            {" "}
            <DynamicBlogpage2 />
          </PrivateRoute>
        ),
      },
      {
        path: "/all_events",
        element: (
          <PrivateRoute>
            {" "}
            <AllEvents></AllEvents>
          </PrivateRoute>
        ),
      },

      {
        path: "/contact_us",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/permission",
        element: (
          <PrivateRoute>
            <FitbitTerms></FitbitTerms>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>{" "}
          </PrivateRoute>
        ),
      },

      {
        path: "bmi_calculator",
        element: (
          <PrivateRoute>
            <BmiCalculator />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "productForm",
        element: <PrivateRoute> <ProductFrom /> </PrivateRoute>
      },
      {
        path: "yourProducts",
        element: <PrivateRoute> <ProductsCollections /> </PrivateRoute>
      },
      {
        path: "yourProducts/updateProducts/:id",
        loader: ({params})=> axiosPublic(`/products/${params.id}`),
        element: <PrivateRoute> <UpdateProductForm/> </PrivateRoute>
      },
      {
        path: "yourProducts/:id",
        element: <PrivateRoute> <DynamicProductPage/> </PrivateRoute>
      },
      {
        path: "BlogFrom",
        element: (
          <PrivateRoute>
            <UploadBlogs />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "set_goal",
        element: (
          <PrivateRoute>
            <SetGoal></SetGoal>
          </PrivateRoute>
        ),
      },
      {
        path: "set_goal/weightManagement",
        element: (
          <PrivateRoute>
            {" "}
            <ManageWeight></ManageWeight>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "set_goal/strengthTraining",
        element: (
          <PrivateRoute>
            <StrengthTraining></StrengthTraining>
          </PrivateRoute>
        ),
      },
      {
        path: "set_goal/endurance",
        element: (
          <PrivateRoute>
            <Endurance></Endurance>
          </PrivateRoute>
        ),
      },
      {
        path: "goal_tracking",
        element: <GoalTrackingPage />,
      },
      {
        path: "daily_activity",
        element: (
          <PrivateRoute>
            {" "}
            <TrackProgress />
          </PrivateRoute>
        ),
      },
      {
        path: "connect_app",
        element: (
          <PrivateRoute>
            {" "}
            <ConnectApp></ConnectApp>
          </PrivateRoute>
        ),
      },
      {
        path: "strava_connect",
        element: (
          <PrivateRoute>
            <StravaCondition></StravaCondition>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "strava_activities",
        element: (
          <PrivateRoute>
            <StravaActivities></StravaActivities>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/compare_activity/:id1/:id2",
        element: (
          <PrivateRoute>
            <CompareActivity></CompareActivity>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "set_goal/create_goal",
        element: (
          <PrivateRoute>
            {" "}
            <CreateGoal></CreateGoal>
          </PrivateRoute>
        ),
      },
      {
        path: "my_blogs",
        element: (
          <PrivateRoute>
            <MyBlogs />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "feedback",
        element: (
          <PrivateRoute>
            <Feedback></Feedback>
          </PrivateRoute>
        ),
      },
      {
        path: "connect_people",
        element: <ConnectPeople></ConnectPeople>,
      },
      {
        path: "connected_with",
        element: <ConnectedPeople></ConnectedPeople>,
      },
      {
        path: "message",
        element: <Message></Message>
      },
      // admin routs
      {
        path: "manage_users",
        loader: () => axiosPublic("/usersCount"),
        element: (
          <AdminRouts>
            <ManageUsers />
          </AdminRouts>
        ),
      },
      {
        path: "manage_Products",
        element: <AdminRouts> <ProductsForAdmin/> </AdminRouts>
      },
      {
        path: "manage_Products/:id",
        element: <AdminRouts> <DynamicProductPage/> </AdminRouts>
      },
      {
        path: "manage_blogs",
        element: (
          <AdminRouts>
            <MangeBlogPage></MangeBlogPage>
          </AdminRouts>
        ),
      },
      {
        path: "add_event",
        element: (
          <AdminRouts>
            <AddEvent></AddEvent>
          </AdminRouts>
        ),
      },
      {
        path: '/dashboard/updateBlogs/:id',
        element: <UpdateBlogs />
      }
    ],
  },
]);

export default MyRouts;
