import React from 'react'
import Card from './Card'

const Stats = () => {
  return (
    <div className='flex flex-col md:flex-row gap-5'>
      <div className='flex  flex-col gap-4 h-full'>
        <Card />
      </div>
    </div>
  )
}

export default Stats
