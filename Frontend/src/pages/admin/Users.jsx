import React, { useEffect, useState } from 'react';
import { dele, get } from '../../services/Endpoint';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setApiRefresher } from '../../redux/reducers/PostSlice';

const Users = () => {
  const [users, setUsers] = useState([]);
  const {refresh} = useSelector(state=>state.post);
  const dispatch = useDispatch();

  const getAllUsers = async () => {
    try {
      const res = await get("/dashboard/users");
      if (res.status === 200) {
        setUsers(res.data.users);
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, [refresh])

  const deleUserHandler = async (id) => {
    try {
      const res = await dele(`/dashboard/user/${id}`);

      const { role } = res.data.users;
      console.log(role);

      if (res.status === 200) {
        toast.success(res.data.message);
        dispatch(setApiRefresher(true));
      } else {
        dispatch(setApiRefresher(false));
      }

    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong!";
      toast.error(errMsg);
      dispatch(setApiRefresher(false));
      console.log(error);
    }
  }

  return (
    <div className='w-[80vw] min-h-screen bg-white px-5 text-black py-5 my-5'>
      <h1 className='text-3xl font-bold mb-5'>All Users</h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className='min-w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-white uppercase bg-gray-800'>
            <tr>
              <th scope="col" className="px-6 py-3">Index</th>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-100">
                <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === 'admin' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => deleUserHandler(user._id)} className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600 transition-all duration-200">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
