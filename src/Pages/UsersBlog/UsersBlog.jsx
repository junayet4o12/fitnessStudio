import { useEffect, useState } from "react"
import useAxiosPublic from "../../Hooks/useAxiosPublic"
import { Link, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"

const UsersBlog = () => {
    const axiosPublic = useAxiosPublic()
    const [blogs, setblogs] = useState([])
    const [write, setWriter] = useState([])
    const param = useParams().email
    const paramid = useParams().id

    useEffect(()=>{
        axiosPublic(`/my_blogs/${param}`)
        .then(res=> setblogs(res.data))
    },[])
    useEffect(()=>{
      axiosPublic(`/users?email=${param}`)
       .then(res => setWriter(res.data))
    },[blogs])

  return (
    <div className="p-[10px]">
        <Helmet>
            <title>Blog collection</title>
        </Helmet>
        <div className="flex gap-2 bg-secondary bg-opacity-40 my-[50px] p-[10px]">
          {
            write.map((writer)=>
            <div 
            className="flex flex-col md:flex-row justify-around items-center gap-4 bmiNumber text-primary"
            key={writer._id}>
                <div className="flex flex-col items-center gap-3">
                  <img className="h-[200px] rounded-full object-cover" src={writer.image}/>
                  <button className="bg-primary p-[10px] text-xl text-white rounded-md">Follow Now</button>
                </div>
                <div>
                <h1 className="text-2xl font-[600]">{writer.name}</h1>
                <h1 className="text-base font-[600]">{writer.email}</h1>
                <h1 className="text-base font-[600]">D.O.B: {writer.birthDay}</h1>
                <h1 className="text-base font-[600]">Status: {writer.Status}</h1>
                <h1 className="text-base font-[600]">Followers: {writer.followers}</h1>
                <h1 className="text-base font-[600]">following: {writer.following}</h1>
                <h1 className="text-base font-[600]">Total posts: {blogs.length}</h1>
                </div>
            </div>
            )
          }
        </div>
      <div className="flex flex-col md:flex-row flex-wrap justify-evenly gap-2">
        {
            blogs.map(blog=>
                <div 
                className="lg:w-[30%] shadow-xl rounded-md flex flex-col justify-between overflow-hidden"
                key={blog._id}>
                        <img className="h-[260px] w-full object-cover" src={blog.blogImg}/>
                    <div className="p-[10px] flex flex-col gap-2">
                    <Link to={`/blogs/${paramid}/${param}/${blog._id}`}>
                        <h1 className="text-2xl font-[600]">{blog.blogName}</h1>
                    </Link>
                        <p>published at: <span className="bmiNumber">{blog.time}</span></p>
                        <div dangerouslySetInnerHTML={{__html:`${blog.blogDes.slice(0-350)}}`}}/>
                    </div>
                </div>)
        }
      </div>
    </div>
  )
}

export default UsersBlog
