import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
  const {user} = useSelector(state=>state.auth);
  const navigate = useNavigate();

  useEffect(()=>{ 
   if(user.role !== "admin"){
    navigate('/');
   }
  },[user]);

  return (
    <>
    <Nav/>
    <div className="flex">
    <Sidebar/>
    <div className="px-5">
          <Outlet/>
    </div>
    </div>
    </>
  )
}

export default AdminLayout