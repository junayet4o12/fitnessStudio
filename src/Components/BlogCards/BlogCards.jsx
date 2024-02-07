/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAxiosPublic from '../../Hooks/useAxiosPublic'

const BlogCards = ({ blogs }) => {
    const [Cardblogs, setCardblogs] = useState([])
    const [searchInput, setsearchInput] = useState("")
    const AxiosPublic = useAxiosPublic()

        // search Functionality

        const SearchFunction =(e)=>{
            e.preventDefault()
            AxiosPublic(`/blogs?search=${searchInput}`)
            .then(res => setCardblogs(res.data))
          }

          console.log(setsearchInput.length);

    return (
        // <div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-[10px]'>
        <div className={"flex flex-col md:flex-row items-start p-[10px]"}>
           <div className='md:w-[70%]'>
           {
                blogs === undefined ? <h1>I am Ohee</h1>:
            <div className={'flex flex-col w-full gap-6 p-[10px]'}>

                {/* search form */}
                          <div className='w-full mx-auto flex items-center justify-center my-[50px]'>
                                <form onSubmit={SearchFunction} className='w-full flex justify-center  p-[10px] mx-auto'>
                                <input 
                                onChange={(e)=>setsearchInput(e.target.value)}
                                className='border-2 border-secondary p-[10px] text-xl w-[60%] rounded-l-[50px] outline-none' 
                                type="text" placeholder='Search a blog' name='search' />
                                <button 
                                    type='submit'
                                    className='border-2 border-secondary bg-secondary text-xl p-[10px] text-white rounded-r-[50px]'>
                                    Search
                                </button>
                                </form>
                            </div>
                {blogs.map((blog) =>
                    <div className={searchInput.length > 1 ? "hidden" :'flex flex-col md:flex-row shadow-xl rounded-md justify-between'} key={blog?._id}>
                        <div className='md:w-[45%]'>
                            <img src={blog.blogImg} className='w-full object-cover h-[200px] md:h-[300px] rounded-md' />
                        </div>
                        <div className='md:w-[55%] flex flex-col justify-between'>
                            <div className='p-[20px] flex flex-col gap-3'>
                                <Link to={`/blogs/${blog._id}`}>
                                    <h1 className='font-bold text-xl text-primary'>{blog.blogName}</h1>
                                </Link>
                                <div dangerouslySetInnerHTML={{__html: `${blog.blogDes.slice(0-350)}`}}></div>
                            </div>
                            <div>
                                <div className='w-[100%] h-[2px] bg-secondary'></div>
                                <div className='p-[10px] flex gap-2 items-center justify-start'>
                                    <img className='w-[50px] h-[50px] object-cover object-top rounded-full' src={blog.userImg} />
                                    <div>
                                        <Link to={`blogs/${blog.userEmail}`}>
                                            <h1 className='font-bold'>{blog.userName}</h1>
                                        </Link>
                                        <h1 className='bmiNumber'>{blog.time}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            }
            {
                Cardblogs.length === 0 ? <h1 className={searchInput <2 ? "hidden": "block"}>No, Blogs found</h1>:
            <div className={'flex flex-col w-full gap-6 p-[10px]'}>
                         
                {Cardblogs.map((blog) =>
                    <div className={Cardblogs.length > 0 ?'flex flex-col md:flex-row shadow-xl rounded-md justify-between': "hidden"} key={blog?._id}>
                        <div className='md:w-[45%]'>
                            <img src={blog.blogImg} className='w-full object-cover h-[200px] md:h-[300px] rounded-md' />
                        </div>
                        <div className='md:w-[55%] flex flex-col justify-between'>
                            <div className='p-[20px] flex flex-col gap-3'>
                                <Link to={`/blogs/${blog._id}`}>
                                    <h1 className='font-bold text-xl text-primary'>{blog.blogName}</h1>
                                </Link>
                                <div dangerouslySetInnerHTML={{__html: `${blog.blogDes.slice(0-350)}`}}></div>
                            </div>
                            <div>
                                <div className='w-[100%] h-[2px] bg-secondary'></div>
                                <div className='p-[10px] flex gap-2 items-center justify-start'>
                                    <img className='w-[50px] h-[50px] object-cover object-top rounded-full' src={blog.userImg} />
                                    <div>
                                        <Link to={`blogs/${blog.userEmail}`}>
                                            <h1 className='font-bold'>{blog.userName}</h1>
                                        </Link>
                                        <h1 className='bmiNumber'>{blog.time}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            }
           </div>
            <div className='hidden md:flex flex-col w-[25%]'>
                <h1 className='border-l-2 border-secondary pl-[5px] font-[500] text-xl'>Latest Blogs:</h1>
                <div className='flex flex-col gap-4 my-[25px]'>
                    {
                        blogs?.reverse()?.slice(0,5)?.map((blog) =>
                            <div key={blog._id} className='w-full flex gap-5 items-center shadow-lg rounded-md'>
                                <img className='h-[100%] w-[45%] object-contain' src={blog.blogImg} alt="" />
                                <Link to={`/blogs/${blog._id}`}>
                                    <h1 className='font-bold text-md text-primary'>{blog.blogName}</h1>
                                </Link>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default BlogCards
