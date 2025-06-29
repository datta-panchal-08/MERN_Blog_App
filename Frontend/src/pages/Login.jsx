import { useForm } from "react-hook-form";
import { BiSolidUserCircle } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom'
import { post } from "../services/Endpoint";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/AuthSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const loginHandler = async (data) => {
    try {
      const res = await post(`/auth/login`, data);

      if (res.status === 200) {
        toast.success(res.data.message);
        navigate('/');
        dispatch(setUser(res.data.user))
      } else {
        toast.error(res.data.error)
      }
      reset();
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong!";
      toast.error(errMsg);
    }
  }


  return (
    <div className='w-full h-screen flex justify-center items-center '>
      <form className="w-[22%] h-fit flex flex-col py-3 px-4 gap-3 rounded-md bg-white text-black" onSubmit={handleSubmit(loginHandler)}>
        <div className="heading w-full flex items-center justify-center gap-1">
          <BiSolidUserCircle className="text-6xl text-sky-500" />
        </div>
        <div className="input-div flex flex-col gap-0.5">
          <input {...register("email", { required: "email cannot be empty" })} className="border-b-1 px-3 py-1 outline-none" type="email" placeholder="email..." />
          {
            errors?.email?.message && <small className="text-red-600 font-semibold">{errors?.email?.message}</small>
          }
        </div>

        <div className="input-div flex flex-col gap-0.5">
          <input {...register("password", { required: "password cannot be empty" })} className="border-b-1 px-3 py-1 outline-none" type="password" placeholder="password..." />
          {
            errors?.password?.message && <small className="text-red-600 font-semibold">{errors?.password?.message}</small>
          }
        </div>

        <button type="submit" className="px-4 py-1 rounded-md bg-violet-500 text-white font-semibold cursor-pointer">Login</button>

        <p className="text-center text-sm font-semibold text-sky-600">don't have an account <br /> signup using <Link to="/signup" className="text-violet-600 underline">Signup</Link></p>

      </form>
    </div>
  )
}

export default Login