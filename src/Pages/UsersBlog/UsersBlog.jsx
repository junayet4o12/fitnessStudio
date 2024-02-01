import { useEffect, useState } from "react"
import useAxiosPublic from "../../Hooks/useAxiosPublic"
import { Link, useParams } from "react-router-dom"

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
    <div className="p-[10px]">
      <div className="flex flex-col md:flex-row flex-wrap justify-evenly gap-2">
        {
            blogs.map(blog=>
                <div 
                className="w-[25%] shadow-md"
                key={blog.id}>
                        <img className="h-[300px] w-full object-contain" src={blog.blogImg}/>
                    <div className="p-[10px]">
                    <Link to={`/blogs/${paramid}/${param}/${blog._id}`}>
                        <h1 className="text-2xl font-[600]">{blog.blogName}</h1>
                    </Link>
                        <p>{blog.blogDes.slice(0,350)}...</p>
                    </div>
                </div>)
        }
      </div>
    </div>
  )
}

export default UsersBlog
