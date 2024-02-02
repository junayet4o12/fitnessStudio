import { useEffect, useState } from "react"
import useAxiosPublic from "../../Hooks/useAxiosPublic"
import { Link, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"

const UsersBlog = () => {
    const axiosPublic = useAxiosPublic()
    const [blogs, setblogs] = useState([])
    const param = useParams().email
    const paramid = useParams().id

    useEffect(()=>{
        axiosPublic(`/my_blogs/${param}`)
        .then(res=> setblogs(res.data))
    },[])
  return (
    <div className="p-[10px] my-[50px]">
        <Helmet>
            <title>Blog collection</title>
        </Helmet>
      <div className="flex flex-col md:flex-row flex-wrap justify-evenly gap-2">
        {
            blogs.map(blog=>
                <div 
                className="lg:w-[30%] shadow-xl rounded-md flex flex-col justify-between"
                key={blog.id}>
                        <img className="h-[260px] w-full object-cover" src={blog.blogImg}/>
                    <div className="p-[10px] flex flex-col gap-2">
                    <Link to={`/blogs/${paramid}/${param}/${blog._id}`}>
                        <h1 className="text-2xl font-[600]">{blog.blogName}</h1>
                    </Link>
                        <p>published at: <span className="bmiNumber">{blog.time}</span></p>
                        <p>{blog.blogDes.slice(0,350)}...</p>
                    </div>
                </div>)
        }
      </div>
    </div>
  )
}

export default UsersBlog
