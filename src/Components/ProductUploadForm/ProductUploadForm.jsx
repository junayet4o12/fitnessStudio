import React from 'react'
import { Helmet } from 'react-helmet-async'
import defImage from "/default-image.jpg"

const ProductUploadForm = () => {
  return (
    <div className='flex flex-col gap-3'>
        <Helmet>
            <title>Product form - FitnessStudion</title>
        </Helmet>
      <h1 className='text-center text-3xl font-[600]'>List  <span className='specialFont text-primary'> your </span>product</h1>
      <p  className='text-center'>fill out the form and publish your product here. we are here to help you with that.</p>
      <form
      className='flex flex-col gap-2'>
        <div className='flex flex-col md:flex-row gap-2 w-full'>
            <div className='w-full'>
                <label
                className='text-xl font-[600]'
                htmlFor="name">Product Name</label>
                <input
                required
                className='text-xl p-[10px] w-full border-2 border-primary rounded-md'
                type="text" name="name" placeholder='Product name' id="name" />
            </div>
            <div className='w-full'>
                <label
                className='text-xl font-[600]'
                htmlFor='price'>Price</label>
                <input
                required
                className='text-xl p-[10px] w-full border-2 border-primary rounded-md bmiNumber'
                type="number" name="name" placeholder='৳ 00' id="price" />
            </div>
        </div>
        <label
            className='text-xl font-[600]'
            htmlFor='description'>Description</label>
        <textarea
        required
        className='text-xl p-[10px] w-full border-2 border-primary rounded-md h-[250px] max-h-[250px] min-h-[250px] text-left'
        placeholder='Description' id='description'
        />
        <div>
            <label 
            className='text-xl font-[600]'
            htmlFor="">Select product's photo</label>
            <div
            className='flex gap-2 justify-center mt-[10px]'
            >
                <img className='w-full  object-cover h-[300px]' src={defImage} alt="" />
            </div>
        </div>
        <button
        className='bg-secondary text-white text-xl font-bold p-[10px] w-full rounded-b-md'
        >Save & continue</button>
      </form>
    </div>
  )
}

export default ProductUploadForm
