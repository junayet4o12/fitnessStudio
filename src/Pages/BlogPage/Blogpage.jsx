import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import BlogCards from '../../Components/BlogCards/BlogCards'
import BlogSlider from '../../Components/BlogSlider/BlogSlider'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { useLoaderData } from 'react-router-dom'

const Blogpage = () => {
    const [allblogs, setAllblogs] = useState()
    const [blogs, setblogs] = useState([])
    const [currentPage, setCurrentpage] = useState(0)
    const AxiosPublic = useAxiosPublic()

    
    const count = useLoaderData().data.count
    const limit = 5
    const numberOfpages = Math.ceil(count/limit)
    const pages = [...Array(numberOfpages).keys()]

    useEffect(()=>{
      AxiosPublic(`/blogs?page=${currentPage}&size=${limit}`)
        // .then(res => res.json())
        .then(data =>setblogs(data.data))
    },[currentPage])

    const previousPage = ()=>{
      if (currentPage >0) {
        setCurrentpage(currentPage - 1)
      }
    }

    const nextpage =()=>{
      if (currentPage < pages.length -1 ) {
        setCurrentpage(currentPage + 1)
      }
    }
  




  return (
    <div className='mb-[100px]'>
        <Helmet>
            <title>Blogs - FitnessStudion</title>
        </Helmet>
          <BlogSlider blogs={blogs}/>
          {/* blog cards */}
          
          <BlogCards blogs={blogs} allblogs={allblogs}/>
          <div className='flex flex-wrap gap-1 p-[10px] md:w-[70%] justify-center'>
            <button onClick={previousPage} className='bg-secondary text-white rounded-xl p-[10px] font-bold'>Preious</button>
            {
              pages.map((page)=>
              <button 
              className={currentPage === page ? "bg-white border-2 border-secondary text-primary rounded-xl p-[10px] font-bold" :'bg-secondary border-secondary text-white rounded-xl p-[10px] font-bold border-2'}
              onClick={()=>setCurrentpage(page)}
              key={page}>{page + 1}</button>)
            }
            <button onClick={nextpage} className='bg-secondary text-white rounded-xl p-[10px] font-bold'>Next</button>
          </div>
    </div>
  )
}

export default Blogpage
