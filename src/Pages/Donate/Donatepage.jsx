import React from 'react'
import DonateBanner from '../../Components/DonateBanner/DonateBanner'
import { Helmet } from 'react-helmet-async'
import DonateWorks from '../../Components/DonateWorks/DonateWorks'

const Donatepage = () => {
  return (
    <div>
        <Helmet>
            <title>Donate - FitnessStudio</title>
        </Helmet>
      <DonateBanner/>
      <DonateWorks/>
    </div>
  )
}

export default Donatepage
