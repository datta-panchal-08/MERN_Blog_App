import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import { useSelector } from 'react-redux'

const UserLayout = () => {
  const {user} = useSelector(state=>state.auth);
  return (
    <>
    <Nav/>
    <Outlet/>
    </>
  )
}

export default UserLayout