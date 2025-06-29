import React from 'react'
import Post from './Post'
import ReactCrousal from '../components/ReactCrousal'

const Home = () => {
  
  return (
    <div className='px-10'>
      <ReactCrousal/>
      <Post/>
    </div>
  )
}

export default Home