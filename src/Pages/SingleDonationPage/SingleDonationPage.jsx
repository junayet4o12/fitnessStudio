import React from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useSingleDonationData from '../../Hooks/useSingleDonationData';
import CheckOut from './Checkout';

const SingleDonationPage = () => {
  const [open, setOpen] = React.useState(false);
  let id = useParams();
  console.log("user id is", id)


  const [donationData] = useSingleDonationData(id?.id)

  console.log("Donation data is ", donationData)
  const handleOpen = () => setOpen(!open);
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY)
  const shareFunction = () => {
    navigator.clipboard.writeText(window.location.href)
    Swal.fire({
      title: "Copyed the link",
      icon: "success"
    })
  }

  return (
    <div className='p-[10px] container'>
      <h1 className='text-4xl font-bold pt-[50px] pb-[25px]'>{donationData[0]?.caption}</h1>
      <div className='flex flex-col md:flex-row gap-2 items-start mb-[25px]'>
        <div className='w-full md:w-[65vw]'>
          <img className='rounded-md w-full' src={donationData[0]?.imageUrl} alt="" />
        </div>
        <div className='rounded-md shadow-md w-full md:w-[35vw] p-[20px] bmiNumber flex flex-col items-center gap-4 sticky top-40'>
          <h1> <span className='text-4xl font-[500]'>{donationData[0]?.Raised}৳</span> raised out of {donationData[0]?.amount}৳ Goal</h1>
          <h1> <span className='text-xl font-[500]'>Expires in: {donationData[0]?.deadLine}</span></h1>
          <div className='w-full bg-gray-300'>
          <div
          style={{ width: `${((donationData[0]?.Raised / donationData[0]?.amount) * 100).toFixed(0)}%` }}
            className={`w-[${((donationData[0]?.Raised / donationData[0]?.amount) * 100).toFixed(0)}%] h-[4px] rounded-lg bg-black items-start`}
          ></div>
          </div>
          <button
            onClick={shareFunction}
            className='bg-secondary text-white text-xl rounded-md p-[10px] w-full'>Share</button>

          {/* <button className='bg-secondary text-white text-xl rounded-md p-[10px] w-full'>Donate</button> */}
          <Button disabled={donationData[0]?.amount <= donationData[0]?.donated_amount} onClick={handleOpen} 
          className='bg-secondary text-white text-xl rounded-md p-[10px] w-full'>
            Donate Now
          </Button>

          <Dialog open={open} handler={handleOpen} className=" w-3/4">
            <DialogBody className=" mx-auto">


              <Elements stripe={stripePromise}>

                <CheckOut id={donationData[0]?._id}> </CheckOut>


              </Elements>



            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" className="mr-1 text-green-500" onClick={handleOpen}>
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      </div>
      <div className='p-[20px] flex flex-col gap-3'>
        <p className='text-2xl font-[600]'>Story</p>
        <p className='font-[500]'>{donationData[0]?.story}</p>
      </div>
    </div>
  )
}

export default SingleDonationPage
