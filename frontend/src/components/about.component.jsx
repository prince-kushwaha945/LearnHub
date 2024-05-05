import React from 'react'
import { Link } from 'react-router-dom'
import { getFullDay } from '../common/date'

const AboutUser = ( { className, bio, social_liks, joinedAt}) => {
  return (
    <div className={"md:w-[90%] md:mt-7 " + className }>
       <p className='text-xl leading-7'> {bio.length ? bio : "Nothing to read here"} </p>

       <div className='flex gap-x-7 gap-y-2 flex-wrap my-7 items-center text-dark-grey'>
        {
          Object.keys(social_liks).map((key) => {
            let link = social_liks[ key ]

            return link ? <Link to={link} key={key} target='_blank'> <i class={"fi " + (key != 'website' ? "fi-brands-" + key : "fi-br-globe" ) + " text-2xl hover:text-black"}></i></Link> : " "

          })
        }
       </div>

       <p className=' text-xl leading-7 text-dark-grey '> Joined on  {getFullDay(joinedAt)} </p>
    </div>
  )
}

export default AboutUser