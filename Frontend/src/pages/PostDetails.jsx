import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get, post, ImageUrl, dele } from '../services/Endpoint';
import { toast } from 'react-toastify';
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import ReactMarkdown from 'react-markdown'; // 👈 import this at top
import { useDispatch, useSelector } from 'react-redux'
import { setApiRefresher } from '../redux/reducers/PostSlice';
import { useForm } from 'react-hook-form';
import { FaTrash } from "react-icons/fa";


const PostDetails = () => {
  const [blogpost, setBlogPost] = useState([]);
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { refresh } = useSelector(state => state.post);
  const { register, reset, handleSubmit, formState: { errors } } = useForm();

  const createcomment = async (data) => {
    try {
      const res = await post("/comment/create", {
        comment: data.comment,
        blogId: id
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        dispatch(setApiRefresher());
        reset();
      }

    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong!";
      toast.error(errMsg);
    }
  };



  const getpostbyid = async () => {
    try {
      const { data } = await get(`/blog/${id}`);
      setBlogPost(data.findblog);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getpostbyid();
  }, [id, refresh])

  const commentDeleteHandler = async (id) => {
    try {
      const res = await dele(`/comment/delete/${id}`);
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
    <div className='w-full min-h-screen  flex flex-col gap-3 px-10 pb-10'>

      <div className="banner w-full overflow-hidden ">
        <img className='w-full h-[80vh] object-cover rounded-md object-[50%_30%]' src={`${ImageUrl}/${blogpost.image}`} alt={blogpost.title} />
      </div>

      <div className="content pb-5">
        <h1 className='text-5xl font-semibold mb-3'>{blogpost.title}</h1>
        <div className='prose prose-lg max-w-none text-xl text-gray-500'>
          <ReactMarkdown>
            {blogpost.description}
          </ReactMarkdown>
        </div>

      </div>

      <div className="comments w-full">

        <div className="create-comment w-full flex flex-col gap-5">
          <form onSubmit={handleSubmit(createcomment)}>
            <input {...register("comment", { required: "comment cannot be empty" })} className='bg-white rounded w-full text-xl font-semibold text-black px-4 py-4 outline-none' type="text" placeholder='Write comment...' />
            {errors?.comment?.message && <small className='text-red-600 font-semibold'>{errors?.comment?.message}</small>} <br />
            <button
              type='submit'
              className='text-white w-fit mt-3 rounded-md cursor-pointer bg-red-600 font-semibold text-xl px-4 py-1'
            >
              Comment
            </button>
          </form>
        </div>

        <div className="prev-comments w-full flex flex-col mt-2">

          <div className='flex items-center gap-1'>
            {isCommentVisible ? <IoMdArrowDropdown className='text-3xl text-gray-400 cursor-pointer' onClick={() => setIsCommentVisible(false)} /> : <IoMdArrowDropright className='text-3xl text-gray-400 cursor-pointer' onClick={() => setIsCommentVisible(true)} />
            }
            <h5 className='text-xl font-semibold text-gray-600'>Comments(<span className='px-1'>{blogpost?.comments?.length}</span>)</h5>
          </div>

          {
            isCommentVisible && <div className='w-full flex flex-col gap-3 mt-2'>

              <small className='text-red-600 font-semibold'> {
                blogpost?.comments?.length === 0 && isCommentVisible && <span>no comments available</span>
              }</small>

              {
                blogpost?.comments?.map((user, index) => {
                  return <div key={index} className='comment rounded-md px-2 py-1 flex w-full h-[13vh] gap-2 bg-gray-900 text-white'>
                    <div className="img h-full overflow-hidden">
                      <img className='w-[10vh]  h-[10vh] rounded-full object-cover' src={`${ImageUrl}/${user.userId.profile}`} alt="" />
                    </div>
                    <div className="flex grow-1 justify-between">

                      <div className="comment-txt flex flex-col gap-0.5">
                        <span className='text-lg text-gray-500 font-semibold'>@{user?.userId?.username}</span>
                        <p className='text-sm font-semibold text-gray-400'>{user.comment}</p>
                      </div>

                      <div className="flex items-center justify-center">
                        <button onClick={() => commentDeleteHandler(user._id)} className="bg-red-600 cursor-pointer px-4 py-1 flex items-center gap-1 font-semibold rounded-md">
                          <FaTrash /> Delete
                        </button>
                      </div>

                    </div>
                  </div>
                })
              }
            </div>
          }

        </div>

      </div>

    </div>
  )
}

export default PostDetails