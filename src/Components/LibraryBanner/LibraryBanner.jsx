import React from 'react'

const LibraryBanner = () => {
  return (
    <div className='flex flex-col items-center text-center justify-center gap-4 container mx-auto min-h-[50vh] bg-secondary text-white rounded-t-lg rounded-br-[50px] p-[10px]'>
      <h1
      className='text-4xl font-[600]'
      >Welcome to our <span className='specialFont text-primary'>workout</span> library</h1>
      <p
      className='font-[600]'
      >
      FitnessStudio offers a diverse workout library catering to all fitness levels and preferences, from beginners to seasoned athletes. With a wide range of exercises including cardio, strength training, and yoga, users can find the perfect routine to achieve their fitness goals. Whether it's building strength, improving flexibility, or enhancing overall health, FitnessStudio provides the tools and support needed to succeed on the journey to a healthier lifestyle.
      </p>
    </div>
  )
}

export default LibraryBanner
