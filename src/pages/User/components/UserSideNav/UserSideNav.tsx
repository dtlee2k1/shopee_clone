import { Link, NavLink } from 'react-router-dom'
import userProfile from 'src/assets/images/user-profile.png'
import purchaseIcon from 'src/assets/images/purchase-icon.png'
import avatarDefault from 'src/assets/images/avatar-default.jpg'
import { AnimatePresence, motion } from 'framer-motion'
import useAccountRoute from '../../hooks/useAccountRoute'
import { useApp } from 'src/contexts/app.context'
import { getAvatarUrl } from 'src/utils/helpers'

export default function UserSideNav() {
  const isAccountRoute = useAccountRoute()
  const { profile } = useApp()

  return (
    <div className='flex-shrink-0'>
      <div className='flex items-center border-b border-b-[#efefef] py-4'>
        <div className='h-12 w-12 flex-shrink-0 overflow-hidden'>
          <Link to='account/profile' className='h-full w-full'>
            <img
              src={getAvatarUrl(profile?.avatar) || avatarDefault}
              alt='avatar'
              className='h-full w-full rounded-full border border-black/10 bg-cover'
            />
          </Link>
        </div>
        <div className='flex flex-1 flex-col justify-center pl-4'>
          <div className='max-w-[300px] truncate text-sm font-semibold text-[#333] md:max-w-[100px]'>
            {profile?.name || profile?.email}
          </div>
          <Link
            to='account/profile'
            className='mt-1.5 flex items-center whitespace-nowrap text-sm capitalize text-[#888]'
          >
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
              className='shrink-0'
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa Hồ Sơ
          </Link>
        </div>
      </div>
      <div className='mt-7 flex flex-col'>
        <div className='mb-2.5'>
          <Link
            to='account/profile'
            className='flex items-center whitespace-nowrap text-sm capitalize text-black/90 hover:text-primary'
          >
            <div className='mr-2.5 h-5 w-5 rounded-full'>
              <img src={userProfile} alt='profile' />
            </div>
            Tài khoản của tôi
          </Link>
        </div>
        <AnimatePresence>
          {isAccountRoute && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className='mb-4 flex flex-col space-y-2.5 pl-8 text-sm capitalize'
            >
              <NavLink
                to='account/profile'
                className={({ isActive }) => {
                  const active = isActive ? 'text-primary' : ''
                  return `${active} hover:text-primary`
                }}
              >
                Hồ sơ
              </NavLink>
              <NavLink
                to='account/password'
                className={({ isActive }) => {
                  const active = isActive ? 'text-primary' : ''
                  return `${active} hover:text-primary`
                }}
              >
                Đổi mật khẩu
              </NavLink>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className='mt-1 text-sm capitalize'>
        <NavLink
          to='purchase'
          className={({ isActive }) => {
            const active = isActive ? 'text-primary' : ''
            return `${active} flex items-center hover:text-primary`
          }}
        >
          <div className='h5 mr-2.5 w-5 rounded-full'>
            <img src={purchaseIcon} alt='purchase-icon' />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </div>
  )
}
