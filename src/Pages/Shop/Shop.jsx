import React, { useEffect, useState } from 'react'
import ProductBanner from '../../Components/ProductBanner/ProductBanner'
import ProductsCards from '../../Components/productsCards/productsCards'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { Helmet } from 'react-helmet-async'

const Shop = () => {
    const [products, setProducts] = useState([])
    const axiosPublic = useAxiosPublic()

    useEffect(()=>{
        axiosPublic(`/products?verify=verified`)
        .then(res => setProducts(res.data))
    },[])
  return (
    <div className='min-h-[100vh] p-[10px]'>
        <Helmet>
            <title>Shop - FitnessStudio</title>
        </Helmet>
        <ProductBanner products ={products} />
        <h1 className='text-center mt-[100px] font-[600] text-2xl'>Available products:</h1>
        <div className='mx-auto w-[25%] bg-secondary rounded-md h-[5px]'></div>
        <ProductsCards products ={products}/>
    </div>
  )
}

export default Shop
