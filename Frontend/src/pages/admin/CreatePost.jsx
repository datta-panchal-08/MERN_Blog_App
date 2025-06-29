import { useForm } from 'react-hook-form';
import { post } from '../../services/Endpoint';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setApiRefresher } from '../../redux/reducers/PostSlice';

const CreatePost = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const createPostHandler = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]); // ✅ Field name matches backend
    }

    try {
      const res = await post("/blog/create", formData);
      if (res.status === 200) {
        dispatch(setApiRefresher());
        toast.success(res.data.message);
        reset(); // Clear form
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-[80vw] h-[90vh] flex justify-center px-5 mt-5 grow-1'>
      <form onSubmit={handleSubmit(createPostHandler)} className='w-[35%] bg-white h-fit px-5 py-5 text-black flex flex-col gap-5 rounded-xl'>
        
        <div className="input-div flex flex-col gap-1">
          <input
            type="file"
            {...register("image", {
              required: "Image cannot be empty"
            })}
            className='px-5 py-1 rounded-md border border-gray-400'
          />
          {errors?.image && (
            <small className='text-red-500 font-semibold'>{errors.image.message}</small>
          )}
        </div>

        <div className="input-div flex flex-col gap-1">
          <input
            {...register("title", { required: "Title cannot be empty" })}
            type="text"
            placeholder='Title...'
            className='px-5 py-1 border border-gray-400 outline-none rounded-md'
          />
          {errors?.title && <small className='text-red-500 font-semibold'>{errors.title.message}</small>}
        </div>

        <div className="input-div flex flex-col gap-1">
          <textarea
            {...register("description", { required: "Description cannot be empty" })}
            className='px-5 py-1 h-[30vh] resize-none outline-none border border-gray-400'
            placeholder='Description...'
          />
          {errors?.description && <small className='text-red-500 font-semibold'>{errors.description.message}</small>}
        </div>

        <button type='submit' className='bg-green-600 rounded-md font-semibold text-white py-2 cursor-pointer'>
          Create Post
        </button>

      </form>
    </div>
  );
};

export default CreatePost;
