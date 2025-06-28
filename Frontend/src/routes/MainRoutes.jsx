
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Post from '../pages/Post'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Profile from '../pages/Profile'
import UserLayout from '../layouts/UserLayout'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'
import CreatePost from '../pages/admin/CreatePost'
import AllPosts from '../pages/admin/AllPosts'
import Users from '../pages/admin/Users'

const MainRoutes = () => {
  return (
    <Routes>
        {/*  UserLayout */}
        <Route path='/' element={<UserLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='post/:id' element={<Post/>}/>
        <Route path='profile/:id' element={<Profile/>}/>
        </Route>

        {/* AdminLayout */}

        <Route path='/admin/dashboard' element={<AdminLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='create-post' element={<CreatePost/>}/>
          <Route path='all-posts' element={<AllPosts/>}/>
          <Route path='users' element={<Users/>}/>
        </Route>

        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>} />
    </Routes>
  )
}

export default MainRoutes
