import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from "react-redux";
import useAuth from '../../Hooks/useAuth';
import { fetchSingleUser } from '../../Redux/SingleUserSlice/singleUserSlice';
import Swal from 'sweetalert2';
import { makeVisibleTime } from '../../Hooks/makeVisibleTime';
import { socket } from '../../socketIo/socket';

const DynamicBlogpage = () => {
  const param = useParams().id
  const axiosPublic = useAxiosPublic()
  const [blog, setblog] = useState([])
  const [myblog, setmyblog] = useState([])
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()
  const { user } = useAuth()
  const { user: userDetails } = useSelector(state => state.user)
  useEffect(() => {
    axiosPublic(`/blogs/${param}`)
      .then(data => setblog(data.data))
  }, [param, axiosPublic])

  useEffect(() => {
    axiosPublic(`/user?email=${blog.userEmail}`)
      .then(data => setmyblog(data.data))
  }, [blog, axiosPublic])


  useEffect(() => {
    dispatch(fetchSingleUser(user?.email))
  }, [dispatch, user, loading])
  const handleFollow = () => {
    axiosPublic.put(`/following/${userDetails?._id}`, myblog)
      .then(res => {
        if (res.data.followingResult.matchedCount > 0) {
          setloading(!loading)
          Swal.fire({
            title: "Followed successfully",
            icon: "success"
          })
          const notificationInfo = {
            userName: user?.displayName,
            senderAvatar: user?.photoURL,
            senderId: userDetails?._id,
            receiverName: [myblog?._id],
            type: 'followed',
            senderMail: user?.email,
            time: new Date()

          }
          axiosPublic.post('/notifications', notificationInfo)
          if(res?.data){
            socket.emit('notifications', notificationInfo)
        }
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const unfollow = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to unfollow this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Unfollow"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.put(`/unfollowing/${userDetails?._id}`, myblog)
          .then(res => {
            setloading(!loading)
            Swal.fire({
              title: "Unfollow!",
              text: "unfollowed successfully",
              icon: "success"
            });
          })
          .catch(err => {
            console.log(err);
          })
      }
    });
  }

  const following = userDetails.following
  const followed = userDetails.followed
  const isFollowing = following?.find(id => myblog?._id === id)
  const isFollower = followed?.find(id => myblog?._id === id)


  return (
    <div className='p-[10px] flex flex-col justify-around lg:flex-row my-[50px]'>
      <Helmet>
        <title>{blog.blogName}</title>
      </Helmet>
      <div className='lg:w-[70%]'>
        <img className='h-[350px] w-[90%] mx-auto object-cover' src={blog.blogImg} alt={blog.blogName} />
        <div className='flex gap-2 items-center my-[25px] bg-primary rounded-md'>
          <h1 className='text-2xl font-[600] w-fit bg-white'>{blog.blogName} &nbsp;</h1>
        </div>
        <div dangerouslySetInnerHTML={{ __html: `${blog.blogDes}` }}>
        </div>
      </div>
      <div className='mt-[50px] lg:mt-[0px] lg:w-[25%] md:sticky top-[25%] rounded-md p-[20px] text-white flex flex-col items-center bg-primary bg-opacity-50 h-fit gap-3'>
        <img className='rounded-full' draggable src={blog.userImg} />
        <Link to={`/userProfile/${blog.userEmail}`}>
          <h1 className='text-xl font-[600] '>{blog.userName}</h1>
        </Link>
        {/* <p>Total <span className='bmiNumber'> {myblog.length} posts</span></p> */}
        <p>Published at: <span className='bmiNumber'>{makeVisibleTime(blog.time)}</span></p>


        <span className={`${userDetails?._id === myblog?._id && 'hidden'}`}>
          <button onClick={handleFollow} className={`bg-primary p-[10px] text-xl text-white rounded-md ${isFollower && 'hidden'} ${isFollowing && 'hidden'}`}>
            Follow Now
          </button>
          <button onClick={ unfollow } className={`bg-primary p-[10px] text-xl text-white rounded-md ${isFollowing ? 'block' : "hidden"}`}>
            Unfollow
          </button>
          <button  className={`bg-primary p-[10px] text-xl text-white rounded-md ${isFollower ? 'block' : "hidden"}`}>
            Follower
          </button>

        </span>

      </div>
    </div>
  )
}

export default DynamicBlogpage
