import { Button } from "@material-tailwind/react";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import  { useEffect, useState } from 'react';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import useSingleDonationData from "../../Hooks/useSingleDonationData";
import PropTypes from 'prop-types'



const CheckOut = ({id}) => {
    const axiosPublic = useAxiosPublic()
    const stripe = useStripe()
    const [error,setError] = useState('');
    const { user } = useAuth()
    const [clientSecret, setClientSecret] = useState()
    const [totalAmount, setTotalAmount] = useState('')
    const [donationData,refetch] = useSingleDonationData(id)
    const [transactionId,setTransactionId] = useState()
    const elements = useElements()
    console.log(donationData)
   
    const handleAmount = (e) => {
        e.preventDefault()
        const amount = e.target.value
        const intAmount = parseInt(amount)
        if((intAmount + donationData[0]?.donated_amount) > donationData[0]?.amount){
            const limitedAmount = donationData[0]?.amount - donationData[0]?.donated_amount
            setError (<p className='text-red-500'>Donation Amount must be under {limitedAmount}</p>)

        }
        else{
            setError('')
            setTotalAmount(intAmount)
        }

    }
    useEffect(() => {
        if (totalAmount > 0) {

            axiosPublic.post('/create-payment-intent', { price: totalAmount })
                .then(res => {
                    console.log(res.data)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosPublic, totalAmount])


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message)
        } else {
            console.log('Payment Method is', paymentMethod);
            setError('')
        }
        const {error: confirmError, paymentIntent  } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: card,
                billing_details:
                {
                    name: user.displayName || 'anonymous',
                    email: user.email || 'anonymous'

                }
            }
        }
        )
        if (error) {
            console.log(error)
            setError(confirmError.message)
            
           
        }
       else if (paymentIntent.status === 'succeeded') {
            console.log('payment intent is', paymentIntent)
            setError('')
            setTransactionId(paymentIntent.id)
            const donationInfo = {
                email: user.email,
                name: user.displayName,
                amount: paymentIntent.amount,

            }
            const donationRes = await axiosPublic.post('/payments',  donationInfo)
            console.log(donationRes.data)
            console.log(totalAmount)
            const donationUpdate = await axiosPublic.put(`/help/update/${donationData[0]?._id}`,{donatedAmount: totalAmount})
            console.log(donationUpdate.data)
            refetch()
            
        }

    }
    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="name">Name</label>
            <br />
            <input disabled name='name' defaultValue={user.displayName} type="text" id="" />
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input disabled type="email" defaultValue={user.email} name="email" id="" />
            <br />
            <label htmlFor="amount">Amount</label>
            <br />
            <input onBlur={handleAmount} type="number" placeholder='Donation Amount' name="amount" id="" className='mb-8' />

            <CardElement options={{
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                },
            }}>

            </CardElement>
            <Button size='sm'  className='my-4 text-black bg-blue-600' color="red" type="submit" disabled={!stripe}>
        
                Pay
            </Button>
            <p className='text-red-500'>{error}</p>
            {transactionId && <p className='text-green-500'>Payment Successful!! Your transactionId is: {transactionId}</p>}
            
        </form>
    );
};
CheckOut.propTypes = {
    id : PropTypes.string
}

export default CheckOut;