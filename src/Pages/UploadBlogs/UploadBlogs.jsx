import React from 'react'
import { Helmet } from 'react-helmet-async'

const UploadBlogs = () => {
  return (
    <div className='p-[10px] my-[50px]'>
        <Helmet>
            <title>Upload a blog - FitnessStudio</title>
        </Helmet>
        <div className='flex flex-col items-center gap-[20px]'>
            <h1 className='text-center text-2xl font-bold'>Write a blog</h1>
            <div className='bg-primary w-[70%] h-[5px] rounded-box'></div>
        </div>
      <form className='my-[50px] flex flex-col gap-3'>
        <div className='flex flex-col gap-[20px] items-start w-full'>
            <label htmlFor='blogName' 
            className='font-bold text-xl'>
                Blog Image: 
            </label>
            <input 
            className='border-b-[3px] border-secondary outline-none w-full p-[10px]'
            type="file" name="blogName" placeholder='blog name' id="blogName" />
        </div>
        <div className='flex flex-col gap-[20px] items-start w-full'>
            <label htmlFor='blogName' 
            className='font-bold text-xl'>
                Blog name: 
            </label>
            <input 
            className='border-b-[3px] border-secondary outline-none w-full p-[10px]'
            type="text" name="blogName" placeholder='blog name' id="blogName" />
        </div>
        <div className='flex flex-col gap-[20px] items-start w-full'>
            <label htmlFor='blogName' 
            className='font-bold text-xl'>
                Blog: 
            </label>
            <textarea 
            className='border-b-[3px] border-secondary outline-none w-full p-[10px] min-h-[250px] h-[250px] max-h-[250px]'
            type="text" name="blogName" placeholder='Whats on your mind?' id="blogName" />
        </div>
        <button 
        className='bg-primary text-white font-[600] p-[10px] text-xl rounded-md'
        type='submit'>
            Submit
        </button>
      </form>
    </div>
  )
}

export default UploadBlogs
