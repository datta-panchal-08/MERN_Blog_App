import { Link } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { IoIosCreate } from "react-icons/io";
import { FaSquareLetterboxd } from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";

const Sidebar = () => {
    const linkClass =  "px-5 text-center flex items-center gap-1 py-1 duration-300 hover:bg-blue-700 bg-gray-900 rounded-md font-semibold text-white";
    return (
        <div className='w-[15%] flex py-5 px-3 flex-col gap-5 bg-zinc-950 h-screen '>
            <Link to="/dashboard" className={linkClass}><IoMdHome className='text-2xl'/>Dashboard</Link>
            <Link to="/dashboard/create-post" className={linkClass}><IoIosCreate className='text-2xl'/>Create Post</Link>
            <Link to="/dashboard/all-posts" className={linkClass}><FaSquareLetterboxd className='text-2xl'/>All Posts</Link>
            <Link to="/dashboard/users" className={linkClass}><MdGroups2 className='text-2xl'/>Users</Link>

        </div>
    )
}

export default Sidebar