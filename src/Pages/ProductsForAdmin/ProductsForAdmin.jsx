import React, { useEffect, useState } from 'react'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { FaCheckCircle } from "react-icons/fa";
import { FaPencilRuler } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';


const ProductsForAdmin = () => {
    // const {user} = useContext(AuthContext)
    const [products, setProducts] = useState()
    const [reload, setReload] = useState(true)
    const [allstate, setAllState] = useState(true)
    const [authorizedState, setauthorizedState]= useState(false)
    const Axoispublic = useAxiosPublic()

    useEffect(()=>{
        Axoispublic(`/products`)
        .then(res => setProducts(res.data))
    },[reload])

    const allFunction = () =>{
        Axoispublic(`/products`)
        .then(res => setProducts(res.data))
        setAllState(true)
        setauthorizedState(false)
    }

    const unverified = () =>{
        Axoispublic(`/products?verify=notVerified`)
        .then(res => setProducts(res.data))
        setauthorizedState(true)
        setAllState(false)
    }

    const approvingProduct = (id)=>{
        Axoispublic.post(`/product/${id}`)
        .then(res => 
            Swal.fire({
                title:"product verified successfully",
                icon: "success"
            }),
            setReload(!reload)
            )
    }

    const deletingProduct = (id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this product!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                Axoispublic.get(`/Delproduct/${id}`)
                .then(res=>
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success"
                    }),
                    setReload(!reload)
                    )
            }
          });
    }

  return (
    <div className='p-[10px]'>
      <div className='pt-[50px] pb-[50px]'>
        <Helmet>
            <title>Manage Products - FitnessStudion</title>
        </Helmet>
        <h1 className='text-3xl font-bold'>Listings Requests</h1>
        <p className='font-[500]'>Manage products in your website approve them, or delete them.</p>
      </div>
      <div className='filters flex flex-wrap gap-2 mb-[25px]'>
        <button 
        onClick={allFunction}
        className={`${allstate?"p-[10px] text-xl text-white bg-secondary border-2 border-secondary rounded-md":
        "p-[10px] text-xl text-secondary bg-white border-2 border-secondary rounded-md"
        }`}>All</button>
        <button 
        onClick={unverified}
        className={`${authorizedState?"p-[10px] text-xl text-white bg-secondary border-2 border-secondary rounded-md":
        "p-[10px] text-xl text-secondary bg-white border-2 border-secondary rounded-md"
        }`}>unverifyed</button>
      </div>
        <div>
            {
                products? 
                <div className='flex flex-col gap-4 pb-[100px]'>
                    {
                        products.map(product => 
                                <div className='flex flex-col md:flex-row gap-2 items-center justify-between shadow-lg rounded-md' key={product._id}>
                                    <div 
                            className='flex flex-col md:flex-row gap-2 items-center w-full'>
                                <div>
                                    <img
                                    className='w-full md:w-[250px] md:h-[150px] object-cover rounded-md'
                                    src={product.imgUrl} />
                                </div>
                                <div className="w-full p-[10px] flex flex-col gap-2">
                                    <Link to={product._id}>
                                    <h1 className='text-2xl font-bold'>{product.Pname}</h1>
                                    </Link>
                                    <h1 className='bmiNumber font-[600]'>Requested by: {product.sellerName}</h1>
                                    <h1 className='bmiNumber font-[600]'>Price: {product.Pprice} ৳</h1>
                                    <h1 
                                    className={`${product.verify === "notVerified"?
                                    "bg-red-500 text-white p-[10px] rounded-md flex w-fit cursor-pointer"
                                    :
                                    "bg-green-500 text-white p-[10px] rounded-md flex w-fit cursor-pointer"
                                }`}>
                                        {product.verify}</h1>
                                </div>
                                </div>
                                <div className='p-[10px] flex gap-2 '>
                                    <button title='Approve'
                                    onClick={()=>approvingProduct(product._id)}
                                    className={`${product.verify ==="verified"?'hidden':'text-2xl text-white  border-2 border-secondary bg-primary rounded-md p-[10px]'}`}
                                    ><FaCheckCircle /></button>
                                    <button title='Delete'
                                    onClick={()=> deletingProduct(product._id)}
                                    className='text-2xl text-white  border-2 border-secondary bg-primary rounded-md p-[10px]'
                                    ><MdDelete/></button>
                                </div>
                            </div> )
                    }
                </div>
                : <h1>You didn't listed any products your </h1>
            }
        </div>
    </div>
  )
}

export default ProductsForAdmin
