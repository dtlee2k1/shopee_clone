import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Popover from '../Popover'
import { useApp } from 'src/contexts/app.context'
import { logout } from 'src/apis/auth.api'
import avatarDefault from 'src/assets/images/avatar-default.jpg'

export default function NavHeader() {
  const queryClient = useQueryClient()

  const { isAuthenticated, setAuthenticated, profile } = useApp()

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAuthenticated(false)
      queryClient.removeQueries()
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <nav className='text-white'>
      <div className='flex justify-end'>
        {/* Language Popover */}
        <Popover>
          <Popover.Container>
            <Popover.Heading>
              <div className='flex items-center px-2.5 py-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-5 w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
                  />
                </svg>
                <span className='mx-1'>Tiếng Việt</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-4 w-4'
                  color='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                </svg>
              </div>
            </Popover.Heading>
            <Popover.Content>
              <div className='min-w-[9rem] rounded-sm border-none bg-white shadow-md'>
                <div className='flex flex-col'>
                  <button className='p-2.5 text-left text-sm hover:text-primary'>Tiếng Việt</button>
                  <button className='p-2.5 text-left text-sm hover:text-primary'>English</button>
                </div>
              </div>
            </Popover.Content>
          </Popover.Container>
        </Popover>
        {/* User Popover */}
        {isAuthenticated && (
          <Popover>
            <Popover.Container>
              <Popover.Heading>
                <div className='flex items-center px-2.5 py-1'>
                  <div className='mr-2 h-5 w-5 flex-shrink-0'>
                    <img src={avatarDefault} alt='avatar' className='h-full w-full rounded-full object-cover' />
                  </div>
                  <p className='max-w-[6rem] truncate'>{profile?.name || profile?.email}</p>
                </div>
              </Popover.Heading>
              <Popover.Content>
                <div className='cursor-pointer overflow-hidden rounded-sm border-none bg-white shadow-md'>
                  <div className='flex flex-col'>
                    <Link
                      to='user/account'
                      className='block bg-white px-4 py-2.5 text-sm hover:bg-neutral-50 hover:text-teal-500'
                    >
                      Tài khoản của tôi
                    </Link>
                    <Link
                      to='user/purchase'
                      className='block bg-white px-4 py-2.5 text-sm hover:bg-neutral-50 hover:text-teal-500'
                    >
                      Đơn mua
                    </Link>
                    <button
                      className='block bg-white px-4 py-2 text-start text-sm hover:bg-neutral-50 hover:text-teal-500'
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </Popover.Content>
            </Popover.Container>
          </Popover>
        )}
        {!isAuthenticated && (
          <div className='flex items-center'>
            <Link to='/register' className='px-3 font-medium capitalize hover:text-white/70'>
              Đăng ký
            </Link>
            <div className='h-4 border-r-[1px] border-r-white/40'></div>
            <Link to='/login' className='px-3 font-medium capitalize hover:text-white/70'>
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
