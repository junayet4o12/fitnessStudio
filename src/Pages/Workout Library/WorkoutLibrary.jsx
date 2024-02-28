import { Helmet } from 'react-helmet-async'
import LibraryBanner from '../../Components/LibraryBanner/LibraryBanner'
import WorkOuts from '../../Components/WorkOuts/WorkOuts'

const WorkoutLibrary = () => {
  return (
    <div className='flex flex-col gap-10 pb-[50px] p-[10px]'>
        <Helmet>
            <title>Workout Library - FintessStudio</title>
        </Helmet>
      <LibraryBanner/>
      <WorkOuts/>
    </div>
  )
}

export default WorkoutLibrary
