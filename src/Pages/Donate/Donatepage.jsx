import React from 'react'
import DonateBanner from '../../Components/DonateBanner/DonateBanner'
import { Helmet } from 'react-helmet-async'
import DonateWorks from '../../Components/DonateWorks/DonateWorks'
import DonateCards from '../../Components/DonateCards/DonateCards'

const Donatepage = () => {
  return (
    <div>
        <Helmet>
            <title>Donate - FitnessStudio</title>
        </Helmet>
      <DonateBanner/>
      <DonateWorks/>
      <DonateCards/>
    </div>
  )
}

export default Donatepage
