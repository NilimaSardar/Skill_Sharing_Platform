import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen text-6xl font-medium">
        <h3>Dashboard</h3>
        <Link to="/logout" className='bg-blue-600 rounded-4xl text-white text-2xl px-5 py-2'>Logout</Link>
    </div>
  )
}

export default Dashboard