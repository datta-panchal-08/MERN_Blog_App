import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ImageUrl, post } from '../services/Endpoint';
import {toast} from 'react-toastify';
import { removeUser } from '../redux/reducers/AuthSlice';
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
   const {pathname} = useLocation();
   const navigate = useNavigate();
  const handleLogout = async() =>{
    try {
      const res = await post("/auth/logout");
      if(res.status === 200){
        toast.success(res.data.message);
        dispatch(removeUser());
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  
  useEffect(()=>{
    
  },[pathname]);

  return (
    <div className={`flex w-full items-center justify-between ${
      pathname.includes('/dashboard') ? "px-2 py-2":"px-10 py-5"
    }`}>
      <Link to={'/'} className='font-Qielftan text-4xl text-orange-600 border-b-2  border-gray-600 pb-1'>
        BlogShaala
      </Link>

      <div className="right-nav">
        {
           user ? (   <div className="relative inline-block text-left">
          <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            <img
              src={user.profile ? `${ImageUrl}/${user.profile}` : "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"}
              alt="avatar"
              className="w-[70px] h-[70px] rounded-full border-4 border-sky-500 object-cover"
            />
          </div>

          {isOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-md shadow-lg py-2 z-50">
              <li>
               {
                 user.role === "admin" &&  <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                >
                  Dashboard
                </Link>
               }
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>) : (<Link className='border-1 rounded border-red-500 px-3 py-1 font-semibold hover:bg-red-600 duration-300' to={'/login'}>Login</Link>)
        }

     

      </div>

    </div>
  )
}

export default Nav