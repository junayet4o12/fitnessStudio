import React from 'react'

const ProductBanner = ({products}) => {
    const product1 = Math.floor(Math.random()* products.length)
    const product2 = Math.floor(Math.random()* products.length)
    const product3 = Math.floor(Math.random()* products.length)
    console.log(product1);
  return (
    <div className='flex gap-2'>
        <div 
        className='h-[350px] w-full  bg-no-repeat bg-cover bg-center p-[10px] text-secondary flex flex-col justify-end'
        style={{backgroundImage:`url(${products[product1 === 0 ? product1 + 1 : product1]?.imgUrl})`}}
        >
            <div className='bg-white p-[10px] rounded-md bg-opacity-70 text-[#000428]'>
                <h1 className='text-xl font-bold'>{products[product1 === 0 ? product1 + 1 : product1]?.Pname}</h1>
                <h1 className='text-md font-bold bmiNumber'>Price: {products[product1 === 0 ? product1 + 1 : product1]?.Pprice} ৳</h1>
                <h1 className='text-md font-bold bmiNumber'>posted at: {products[product1 === 0 ? product1 + 1 : product1]?.data}</h1>
            </div>
        </div>
        <div className='w-full md:w-[40%] flex flex-col gap-2'>
            <div
            className='h-[170px] w-full  bg-no-repeat bg-cover bg-center p-[10px] text-secondary flex flex-col justify-end'
            style={{backgroundImage:`url(${products[product2 === 0 ? product2 + 1 : product2]?.imgUrl})`}}
            >
                <div className='bg-white p-[10px] rounded-md bg-opacity-70 text-[#000428]'>
                <h1 className='text-xl font-bold'>{products[product2 === 0 ? product2 + 1 : product2]?.Pname}</h1>
                <h1 className='text-md font-bold bmiNumber'>Price: {products[product2 === 0 ? product2 + 1 : product2]?.Pprice} ৳</h1>
                <h1 className='text-md font-bold bmiNumber'>posted at: {products[product2 === 0 ? product2 + 1 : product2]?.data}</h1>
            </div>
            </div>
            <div
            className='h-[170px] w-full  bg-no-repeat bg-cover bg-center p-[10px] text-secondary flex flex-col justify-end'
            style={{backgroundImage:`url(${products[product3 === 0 ? product3 + 1 : product3]?.imgUrl})`}}
            >
                <div className='bg-white p-[10px] rounded-md bg-opacity-70 text-[#000428]'>
                <h1 className='text-xl font-bold'>{products[product3 === 0 ? product3 + 1 : product3]?.Pname}</h1>
                <h1 className='text-md font-bold bmiNumber'>Price: {products[product3 === 0 ? product3 + 1 : product3]?.Pprice} ৳</h1>
                <h1 className='text-md font-bold bmiNumber'>posted at: {products[product3 === 0 ? product3 + 1 : product3]?.data}</h1>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ProductBanner
