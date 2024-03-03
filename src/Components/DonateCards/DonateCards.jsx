import { useEffect, useState } from "react"
import useAxiosPublic from "../../Hooks/useAxiosPublic"
import { Link } from "react-router-dom"


const DonateCards = () => {
    const Axios = useAxiosPublic()
    const [Request, setRequest] = useState([])
    useEffect(()=>{
        Axios('/help?varify=Verified')
        .then(res=> setRequest(res.data))
    },[])
  return (
    <div className='container grid grid-cols-1 md:grid-cols-3 gap-3 mx-auto pb-[100px]  p-[10px]'>
      {
        Request.map(data=> 
            <div 
            className="rounded-md shadow-lg overflow-hidden"
            key={data._id}>
                <div className="h-[250px] w-full overflow-hidden">
                <Link to={`/Donate/${data._id}`}>
                    <img className=" rounded-md h-[250px] w-full object-cover mx-auto hover:scale-[1.2] duration-75 ease-out" src={data.imageUrl}/>
                </Link>
                </div>
                <div className="p-[10px] flex flex-col gap-2 z-[100]">
                    <Link to={`/Donate/${data._id}`}>
                        <h1 className="text-xl font-[600]">{data.caption}</h1>
                    </Link>
                    <h1 className="md:text-xl font-[600] bmiNumber"> <span className="text-2xl md:text-4xl">{data.Raised} ৳ </span> raised out of {data.amount} ৳</h1>
                </div>
            </div>)
      }
    </div>
  )
}

export default DonateCards
