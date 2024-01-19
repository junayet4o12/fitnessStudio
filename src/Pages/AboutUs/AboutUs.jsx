import { Helmet } from 'react-helmet-async'
import Container from "../../Components/Container/Container"
import FAQ from "../../Components/FAQ/FAQ"
import OurTeam from "../../Components/OurTeam/OurTeam"
import AboutIntro from "../../Components/AboutIntro/AboutIntro"
import StoryBehind from '../../Components/StoryBehind/StoryBehind'
import MissionVision from '../../Components/MissionVision/MissionVision'

const AboutUs = () => {
  return (
    <Container>
    <div className="mt-[50px]" >
      <Helmet>
        <title>About us - FitnessStudio</title>
      </Helmet>
      <AboutIntro/>
      <MissionVision/>
      <StoryBehind/>
      <OurTeam/>
      <FAQ/>
    </div>
    </Container>
  )
}

export default AboutUs;
