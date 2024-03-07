import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const GoalCard = ({title,description,image,category}) => {
    const [isHovered, setIsHovered] = useState(false)

  return (
    <div className={`shadow-md relative bg-white rounded-lg}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <img src={`${image}`} alt="" />
            <div className={`bg-primary h-28 p-2 relative transition-transform duration-500 ease-in-out transform ${isHovered ? 'translate-y-[-55px]' : ''} `}>
              <h2 className="text-2xl text-white font-bold">{title}</h2>
              <p className="my-2 text-gray-300  ">{description} </p>
            </div>
            <div className="flex items-center justify-center">
              <Link to={`/dashboard/set_goal/${category}`}
                className={`text-white mx-4 hover:text-blue-60 px-3 py-2  font-medium rounded-lg mt-2 bg-primary transform transition-all absolute -bottom-0 ${isHovered ? 'z-10 transform transition-all  duration-500 -translate-y-2 opacity-100 scale-100' : '-z-20 opacity-0 scale-0'}`}
              >
                Set Goal
              </Link>
            </div>

          </div>
  )
}

GoalCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image:PropTypes.string,
    category: PropTypes.string
}

export default GoalCard
