import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const UserLayout = lazy(() => import('../layouts/UserLayout'));
const AdminLayout = lazy(() => import('../layouts/AdminLayout'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const CreatePost = lazy(() => import('../pages/admin/CreatePost'));
const AllPosts = lazy(() => import('../pages/admin/AllPosts'));
const Users = lazy(() => import('../pages/admin/Users'));
const PostDetails = lazy(() => import('../pages/PostDetails'));

const MainRoutes = () => {
  return (
      <Routes>
        {/* UserLayout */}
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='post/:id' element={<PostDetails />} />
        </Route>

        {/* AdminLayout */}
        <Route path='/dashboard' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='create-post' element={<CreatePost />} />
          <Route path='all-posts' element={<AllPosts />} />
          <Route path='users' element={<Users />} />
          <Route path='update-post/:id' element={<CreatePost/>}/>
        </Route>

        {/* Auth Pages */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
  );
};

export default MainRoutes;
