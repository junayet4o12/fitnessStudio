import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import BlogCards from '../../Components/BlogCards/BlogCards'
import BlogSlider from '../../Components/BlogSlider/BlogSlider'
import { backendUrl } from '../../BackendUrl/backendUrl'

const Blogpage = () => {
    const [blogs, setblogs] = useState([])

    useEffect(()=>{
        fetch(`${backendUrl}/blogs`)
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
