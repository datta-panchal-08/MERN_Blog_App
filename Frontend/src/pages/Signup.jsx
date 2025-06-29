import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { post } from '../services/Endpoint';
import { toast } from 'react-toastify';
import { BiSolidUserCircle } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';

const Signup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("profile", e.target.files); // important for react-hook-form
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const signupHandler = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.profile && data.profile[0]) {
      formData.append("profile", data.profile[0]);
    }

    try {
      const res = await post("/auth/signup", formData);
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong!";
      toast.error(errMsg);

    }

    reset();
    setPreviewImage(null);
  };

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
      <form onSubmit={handleSubmit(signupHandler)} className="w-[22%] flex flex-col py-4 px-4 gap-4 rounded-md bg-white text-black shadow-md">

        {/* Profile Image with Edit Button */}
        <div className="relative w-24 h-24 mx-auto">
          {
            previewImage
              ? <img src={previewImage} alt="preview" className="w-full h-full object-cover rounded-full border-2 border-sky-500" />
              : <BiSolidUserCircle className="w-full h-full text-sky-500" />
          }

          {/* Edit Icon */}
          <button type="button" onClick={handleImageClick}
            className="absolute bottom-0 right-0 bg-white p-1 rounded-full border shadow-sm">
            <FiEdit className="text-gray-600 text-lg" />
          </button>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            {...register("profile")}
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        <input {...register("username", { required: "Username is required" })} placeholder="Username..." className="border px-3 py-1 rounded" />
        {errors.username && <small className="text-red-500">{errors.username.message}</small>}

        <input {...register("email", { required: "Email is required" })} placeholder="Email..." type="email" className="border px-3 py-1 rounded" />
        {errors.email && <small className="text-red-500">{errors.email.message}</small>}

        <input {...register("password", { required: "Password is required" })} placeholder="Password..." type="password" className="border px-3 py-1 rounded" />
        {errors.password && <small className="text-red-500">{errors.password.message}</small>}

        <button type="submit" className="py-1 bg-violet-500 text-white font-semibold rounded">Signup</button>

        <p className="text-sm text-center">
          Already have an account? <Link to="/login" className="text-violet-600 underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
