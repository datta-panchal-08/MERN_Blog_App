import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { dele, ImageUrl } from '../services/Endpoint'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillDelete } from "react-icons/ai";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { setApiRefresher } from '../redux/reducers/PostSlice';
import { toast } from 'react-toastify';

const PostCard = ({ post }) => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const finalPath = pathname.includes("/all-posts")
  ? `/dashboard/update-post/${post._id}`
  : `/dashboard/update-post/${post._id}`;

  const handleDelete = async (id) => {
    try {
      const res = await dele(`/blog/delete/${id}`);

      if (res.status === 200) {
        toast.success(res.data.message);
        dispatch(setApiRefresher());
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong!";
      toast.error(errMsg);
    }
  }

  return (
    <div className='w-[23%] h-[60vh] bg-white text-black rounded-md overflow-hidden'>
      <div className="img h-[50%] w-full overflow-hidden">
        <Link to={`/post/${post._id}`}>
          <img className='w-full h-full object-cover ' src={`${ImageUrl}/${post.image}`} alt="" />
        </Link>
      </div>
      <div className="content px-2 flex-col gap-1">
        <h1 className='text-[17px] font-semibold '>{post.title.slice(0, 21)}...</h1>
        {
          user.role === "admin" ? <p className='text-sm leading-4.5'>
            {post.description.slice(0, 150)}...
          </p> : <p className='text-sm leading-4.5'>
            {post.description.slice(0, 277)}...
          </p>
        }


        {
          user.role === "admin" && (
            <div className="flex mt-4 items-center justify-between px-2">
              {/* Delete Button */}
              <button
                title="Delete Post"
                className="flex items-center gap-2 bg-red-500 cursor-pointer hover:bg-red-600 text-white text-sm px-4 py-1 rounded-md transition-all duration-300"
                onClick={() => handleDelete(post._id)}
              >
                <AiFillDelete className="text-lg" />
                Delete
              </button>

              {/* Edit Button */}
              <Link
                to={finalPath}
                className="flex items-center gap-2 bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-black text-sm px-4 py-1 rounded-md transition-all duration-300"
                title="Edit Post"
              >
                <BiSolidMessageSquareEdit className="text-lg" />
                Edit
              </Link>
            </div>
          )
        }


      </div>
    </div>
  )
}

export default PostCard