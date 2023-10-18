import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/UserSideNav'

export default function UserLayout() {
  return (
    <div className='bg-neutral-100 pb-12 pt-5'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-7 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='md:col-span-9 lg:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
