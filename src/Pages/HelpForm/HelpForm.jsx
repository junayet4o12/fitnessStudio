import  { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { AuthContext } from '../../Authentication/AuthProvider/AuthProviders'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import Swal from 'sweetalert2'
import axios from 'axios'

const HelpForm = () => {
  const { user } = useContext(AuthContext)
  const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOSTING_KEY}`
  const Axios = useAxiosPublic()

  const fromFunction = (e) => {
    e.preventDefault()
    const image = e.target.image.files[0]
    const caption = e.target.caption.value
    const amount = e.target.amount.value
    const bankName = e.target.bankName.value
    const AcNo = e.target.AcNo.value
    const deadLine = e.target.deadLine.value
    const story = e.target.story.value
    const Data = new Date().toLocaleDateString()
    const verify = "notVerified"
    const Raised = 0
    const host = user.reloadUserInfo.displayName
    const hostEmail = user.reloadUserInfo.email
    const hostImage = user.reloadUserInfo.photoUrl
    const form = new FormData()
    let imageUrl = ""
    form.append("image", image)

    axios.post(imageUploadUrl, form, {
      headers: {
        "content-type": "multipart/form-data",
      }
    })
    .then(res=>{
      if (res?.data?.data?.display_url){
        imageUrl = res?.data?.data?.display_url
        const HelpData = {imageUrl, caption, amount, Raised, bankName, AcNo, story, deadLine, Data, host, hostEmail, hostImage, verify}

        Axios.post('/help', HelpData)
        .then(res=>{
          Swal.fire({
            title: "Request submitted successfully",
            text:"our admin panel will soon check everything and publish your request.",
            icon:"success"
          })
            e.target.image.value = ""
            e.target.caption.value = ""
            e.target.amount.value = ""
            e.target.bankName.value = ""
            e.target.AcNo.value = ""
            e.target.deadLine.value = "" 
            e.target.story.value = ""
        })
      }
    })

  }
  return (
    <div className='p-[10px] flex flex-col gap-4 mt-[25px] mb-[50px]'>
      <Helmet>
        <title>Ask for Help - FitnessStudio</title>
      </Helmet>
      <h1 className='text-4xl font-[600]'>Ask for help</h1>
      <p className='font-[500]'>Give a brief information about your situation in the form below.</p>
      <form
        onSubmit={fromFunction}
        className='felx flex-col gap-3'
      >
        <input
          className='text-xl p-[10px] outline-none font-[500] w-full border-b-2 border-secondary'
          type="file" name="image" id="" required />
        <input
          className='text-xl p-[10px] outline-none font-[500] w-full border-b-2 border-secondary'
          type="text" name='caption' placeholder='Caption' required />
        <input
          className='bmiNumber text-xl p-[10px] outline-none font-[500] w-full border-b-2 border-secondary'
          type="number" name='amount' placeholder='Aim for  ৳ 0.00' required />
        {/* banks */}
        <div className='flex flex-col md:flex-row gap-3 justify-between w-full items-center my-[20px]'>
          <select
            className='text-xl p-[10px] font-[600] outline-none border-b-2 border-secondary w-full'
            name="bankName" id="" required>
            <option value="">Select a bank</option>
            <option value="jamuna bank limited">Jamuna Bank Limited</option>
            <option value="IFIC Bank Limited">IFIC Bank Limited</option>
            <option value="Grameen Bank">Grameen Bank</option>
            <option value="Grameen Bank">National Credit and Commerce Bank Ltd</option>
            <option value="Janata Bank PLC">Janata Bank PLC</option>
            <option value="City Bank">City Bank</option>
            <option value="Islami Bank Bangladesh Ltd">Islami Bank Bangladesh Ltd</option>
            <option value="BRAC Bank Limited">BRAC Bank Limited</option>
            <option value="Rupali Bank Limited">Rupali Bank Limited</option>
            <option value="Dutch Bangla Bank">Dutch Bangla Bank</option>
            <option value="Sonali Bank">Sonali Bank</option>
            <option value="Pubali Bank PLC">Pubali Bank PLC</option>
            <option value="Uttara Bank PLC">Uttara Bank PLC</option>
            <option value="Janata Bank">Janata Bank</option>
            <option value="First Security Islami Bank PLC">First Security Islami Bank PLC</option>
          </select>
          <input
            className='bmiNumber text-xl p-[10px] outline-none font-[500] w-full border-b-2 border-secondary'
            type="number" name="AcNo" placeholder='Account No' id="" required />
          <input
            className='bmiNumber text-xl p-[10px] outline-none font-[500] w-full border-b-2 border-secondary'
            type="date" name="deadLine" id="" required />
        </div>
        {/* end of banks */}
        <textarea
          className='text-xl p-[10px] outline-none font-[500] min-h-[300px] max-h-[300px] w-full border-b-2 border-secondary'
          type="text" placeholder='Story' name='story' required />
        <input
          className='text-xl bg-secondary text-white p-[10px] rounded-md'
          type="submit" value="Submit requst" />
      </form>
    </div>
  )
}

export default HelpForm
