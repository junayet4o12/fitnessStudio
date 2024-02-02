import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import BlogCards from '../../Components/BlogCards/BlogCards'
import BlogSlider from '../../Components/BlogSlider/BlogSlider'

const Blogpage = () => {
    const [blogs, setblogs] = useState([])

    useEffect(()=>{
        fetch("https://fitnessstudio-backend-m0iftt2di-jubayer-ahmed-sajid.vercel.app/blogs")
        .then(res => res.json())
        .then(data =>setblogs(data))
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
