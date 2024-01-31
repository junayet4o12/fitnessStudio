import React from 'react'
import { Link } from 'react-router-dom'

const BlogCards = ({blogs}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-[10px]'>
        {blogs.map((blog)=>
            <div className='shadow-xl rounded-md' key={blog?._id}>
                    <img src={blog.blogImg} className='w-full object-cover h-[200px] rounded-md' />
                <div className='p-[20px] flex flex-col gap-3'>
                    <Link to={`/blogs/${blog._id}`}>
                        <h1 className='font-bold text-xl text-primary'>{blog.blogName}</h1>
                    </Link>
                    <p>{blog.blogDes.slice(0,100)}...</p>
                </div>
                    <div className='w-[100%] h-[2px] bg-secondary'></div>
                <div className='p-[10px] flex gap-2 items-center justify-start'>
                    <img className='w-[50px] h-[50px] object-cover object-top rounded-full' src={blog.userImg}/>
                    <h1 className='font-bold'>{blog.userName}</h1>
                    <h1 className='bmiNumber'>{blog.time}</h1>
                </div>
            </div>
        )}
      </div>
  )
}

export default BlogCards
