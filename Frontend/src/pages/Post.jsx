import React, { useContext } from 'react'
import PostCard from './postCard';
import { useSelector } from 'react-redux';

const Post = () => {

  const {posts} = useSelector(state=>state.post);  

  return (
    <div className='flex flex-wrap justify-between gap-5 py-10'>
        {
           posts.map((p)=>{
            return <PostCard key={p._id} post={p}/>
           })
        }
    </div>
  )
}

export default Post