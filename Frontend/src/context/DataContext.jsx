
import { createContext, useEffect, useState } from "react";
import { get } from "../services/Endpoint";

const DataContext = createContext();


export const DataProvider = ({children})=>{
    const [user,setUser] = useState([]);
    const [posts,setPosts] = useState([]);
    
    const getposts = async()=>{
        try {
            const {data} = await get("/blog/blogs");
            setPosts(data.posts);
        } catch (error) {
            console.log(error);
        }
    }

    // const getcurrentuser = async()=>{
    //     const user = JSON.parse(sessionStorage.getItem())
    // }

    useEffect(()=>{
        getposts();
    },[]);



    return (
        <DataContext.Provider value={{user,posts}}>
            {children}
        </DataContext.Provider>
    )

}


export default DataContext;
