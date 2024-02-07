import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import BlogCards from '../../Components/BlogCards/BlogCards'
import BlogSlider from '../../Components/BlogSlider/BlogSlider'
import useAxiosPublic from '../../Hooks/useAxiosPublic'

const Blogpage = () => {
    const [blogs, setblogs] = useState([])
    const AxiosPublic = useAxiosPublic()

    useEffect(()=>{
<<<<<<< HEAD
        fetch("http://localhost:5000/blogs")
        .then(res => res.json())
        .then(data =>setblogs(data))
=======
      AxiosPublic("/blogs")
        // .then(res => res.json())
        .then(data =>setblogs(data.data))
>>>>>>> d11831cf5cfc69e7a3fc886b21f1203220891ca2
    },[])



  return (
    <div className='mb-[100px]'>
        <Helmet>
            <title>Blogs - FitnessStudion</title>
        </Helmet>
          <BlogSlider blogs={blogs}/>
          {/* blog cards */}
          
          <BlogCards blogs={blogs}/>
    </div>
  )
}

export default Blogpage
