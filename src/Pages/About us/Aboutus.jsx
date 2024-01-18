import { Helmet } from 'react-helmet-async'
import FAQ from "../../Components/FAQ/FAQ"
import OurTeam from "../../Components/OurTeam/OurTeam"
import StoryBenhind from "../../Components/StoryBehind/StoryBenhind"
import MissionVission from "../../Components/MissionVission/MissionVission"
import AboutIntro from "../../Components/AboutIntro/AboutIntro"

const Aboutus = () => {
  return (
    <div className="mt-[50px] p-[10px]" >
      <Helmet>
        <title>About us - FitnessStudio</title>
      </Helmet>
      <AboutIntro/>
      <MissionVission/>
      <StoryBenhind/>
      <OurTeam/>
      <FAQ/>
    </div>
  )
}

export default Aboutus
