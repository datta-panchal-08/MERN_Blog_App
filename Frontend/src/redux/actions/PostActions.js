import { get } from "../../services/Endpoint";
import { setPosts } from "../reducers/PostSlice";

export const fetchPosts = ()=>async(dispatch)=>{
    try {
        const {data} = await get("/blog/blogs");
        dispatch(setPosts(data.posts))
    } catch (error) {
        console.log(error)
    }
}


