import { useEffect, useState } from "react";
import { get } from "../../services/Endpoint";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    users: [],
    posts: [],
    comments:[]
  });
  const getDashboardData = async()=>{
    try {
      const res = await get("/dashboard");
      
      if(res.status === 200){
        setDashboardData(res.data);
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getDashboardData();
  },[]);
  
  return (
    <div className='grow-1 mt-5 gap-10 flex justify-between'>

         <div className=" px-5 py-4 h-[18vh] w-[25vw] bg-yellow-500 text-white font-semibold">
          <h1 className="text-xl font-semibold" >Total Users</h1> 
          <h3 className="text-xl font-semibold" >{dashboardData?.users?.length}</h3>
          </div>    
         
           <div className=" px-5 h-[18vh]  py-4  w-[25vw] bg-green-500 text-white font-semibold">
          <h1 className="text-xl font-semibold" >Total Posts</h1> 
          <h3 className="text-xl font-semibold" >{dashboardData?.posts?.length}</h3>
          </div>   

            <div className=" px-5 h-[18vh]  py-4  w-[25vw] bg-red-500 text-white font-semibold">
          <h1 className="text-xl font-semibold" >Total Comments</h1> 
          <h3 className="text-xl font-semibold" >{dashboardData?.comments?.length}</h3>
          </div>   

    </div>
  )
}

export default Dashboard