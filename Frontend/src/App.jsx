import React from 'react'
import { ToastContainer } from 'react-toastify'
import MainRoutes from './routes/MainRoutes'

const App = () => {
  return (

    <div className='w-screen min-h-screen bg-gray-950 text-white'>
      <ToastContainer position='top-center'/>
      <MainRoutes/>
    </div>
  )
}

export default App