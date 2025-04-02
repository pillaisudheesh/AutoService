import React from 'react';
import assets from '../../common/assets';

const User = () => {
  return (
    <div className='flex gap-3 items-center bg-white p-4 rounded-full dark:bg-gray-600 dark:text-gray-300'>
      <img src={assets.userAvatar} className='w-14 h-14 rounded-full' />
      <div>
        <h3>Adhinath</h3>
        <p>Admin</p>
      </div>
    </div>
  )
}

export default User
