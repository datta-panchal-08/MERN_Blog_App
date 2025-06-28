import { Link } from 'react-router-dom';
const Nav = () => {
  return (
    <div className="flex w-full items-center justify-between px-20 py-5">
      <Link className='font-Qielftan text-4xl text-orange-600 border-b-2  border-gray-600 pb-1'>
        BlogShaala
      </Link>
    </div>
  )
}

export default Nav