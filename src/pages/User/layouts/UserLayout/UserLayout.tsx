import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import UserSideNav from '../../components/UserSideNav'
import { memo } from 'react'

function UserLayoutInner() {
  return (
    <div className='bg-neutral-100 pb-12 pt-5'>
      <Helmet>
        <title>Shopee Clone</title>
        <meta
          name='description'
          content='Chào mừng bạn đến với website Shopee Clone. Tận hưởng mua sắm trực tuyến đơn giản và an toàn. Thuận tiện với tất cả các mặt hàng và miễn phí vận chuyển.'
        />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 gap-7 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='relative md:col-span-9 lg:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
const UserLayout = memo(UserLayoutInner)

export default UserLayout
