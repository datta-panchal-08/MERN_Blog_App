import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import MainRoutes from './routes/MainRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from './redux/actions/PostActions'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state=>state.auth);
  const {refresh} = useSelector(state=>state.post);
  useEffect(()=>{
    dispatch(fetchPosts());
  },[refresh]);

  useEffect(()=>{
    !user && navigate("/login");
  },[user])

  return (

    <div className='max-w-screen min-h-screen  bg-gray-950 text-white'>
      <ToastContainer position='top-center'/>
      <MainRoutes/>
    </div>
  )
}

export default App