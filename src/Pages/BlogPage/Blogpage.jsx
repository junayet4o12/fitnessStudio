import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import BlogCards from '../../Components/BlogCards/BlogCards'
import BlogSlider from '../../Components/BlogSlider/BlogSlider'
import useAxiosPublic from '../../Hooks/useAxiosPublic'

const Blogpage = () => {
    const [blogs, setblogs] = useState([])
    const AxiosPublic = useAxiosPublic()

    useEffect(()=>{
      AxiosPublic("/blogs")
        // .then(res => res.json())
        .then(data =>setblogs(data.data))
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
