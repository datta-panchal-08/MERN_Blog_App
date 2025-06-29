import { useSelector } from 'react-redux';
import PostCard from '../postCard';

const AllPosts = () => {
   const {posts} = useSelector(state=>state.post);  

  return (
    <div className=' w-[80vw] flex flex-wrap justify-between gap-5 py-10'>
        {
           posts.map((p)=>{
            return <PostCard key={p._id} post={p}/>
           })
        }
    </div>
  )
}

export default AllPosts