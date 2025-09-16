import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div>
        <h3>Profile</h3>
        <Link
        to="../logout"
        className="bg-blue-600 rounded-4xl text-white text-2xl px-5 py-2"
        >
            Logout
        </Link>
    </div>
  )
}

export default Profile