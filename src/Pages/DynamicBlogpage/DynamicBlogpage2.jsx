import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { Helmet } from 'react-helmet-async'

const DynamicBlogpage2 = () => {
  const param = useParams().newId
  const axiosPublic = useAxiosPublic()
  const [blog, setblog] = useState([])
  console.log(param);
  useEffect(()=>{
    axiosPublic(`/blogs/${param}`)
    .then(data=> setblog(data.data))
  },[])
  
console.log(blog);
  return (
    <div className='p-[10px] flex flex-col justify-around lg:flex-row my-[50px]'>
      <Helmet>
        <title>{blog.blogName}</title>
      </Helmet>
      <div className='lg:w-[70%]'>
      <img className='h-[350px] w-[90%] mx-auto object-cover' src={blog.blogImg} alt={blog.blogName} />
      <div  className='flex gap-2 items-center my-[25px] bg-primary rounded-md'>
        <h1 className='text-2xl font-[600] w-fit bg-white'>{blog.blogName} &nbsp;</h1>
      </div>
      <p>
        {blog.blogDes}
      </p>
      </div>
      <div className='mt-[50px] lg:mt-[0px] lg:w-[25%] md:sticky top-[25%] rounded-md p-[20px] text-white flex flex-col items-center bg-primary bg-opacity-50 h-fit gap-3'>
        <img className='rounded-full' draggable src={blog.userImg}/>
        <Link to={`/blogs/${param}/${blog.userEmail}`}>
        <h1 className='text-xl font-[600]'>{blog.userName}</h1>
        </Link>
        <p>Published at: <span className='bmiNumber'>{blog.time}</span></p>
      </div>
    </div>
  )
}

export default DynamicBlogpage2
