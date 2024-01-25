import React from 'react'
import BMIBanner from '../../Components/BMIBanner/BMIBanner'
import { Helmet } from 'react-helmet-async'
import BMImeaning from '../../Components/BMImeaning/BMImeaning'
import LimitationOfBMI from '../../Components/LimitationOfBMI/LimitationOfBMI'

const BmiCalculator = () => {
  
  return (
    <div className='p-[10px] mb-[100px]'>
  <Helmet>
    <title>BMI Calculator - FitnessStudion</title>
  </Helmet>
      <BMIBanner/>
      <BMImeaning/>
      <LimitationOfBMI/>
    </div>
  )
}

export default BmiCalculator
