import { useState } from 'react';
import { Link } from 'react-router-dom';
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {isLoggedIn,setIsLoggedIn} = useState(false);

  return (
    <div className="flex w-full items-center justify-between px-10 py-5">
      <Link className='font-Qielftan text-4xl text-orange-600 border-b-2  border-gray-600 pb-1'>
        BlogShaala
      </Link>

      <div className="right-nav">
        {
           isLoggedIn ? (   <div className="relative inline-block text-left">
          <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            <img
              src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"
              alt="avatar"
              className="w-[70px] h-[70px] rounded-full border-4 border-sky-500 object-cover"
            />
          </div>

          {isOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-md shadow-lg py-2 z-50">
              <li>
                <Link
                  to="/admin/dashboard"
                  className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/124456"
                  className="block px-4 py-2 hover:bg-gray-700 transition-colors"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() => alert("Logout logic here")}
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