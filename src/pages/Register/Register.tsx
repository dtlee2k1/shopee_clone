import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className='bg-primary'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 py-12 md:grid-cols-5 md:pr-10'>
          <div className='hidden md:col-span-3  md:block '>
            <img src='/shopee-bg.webp' alt='Shopee' className='w-full bg-cover' />
          </div>
          <div className='mx-auto max-w-md rounded bg-white p-8 shadow-sm md:col-span-2 md:col-start-4 lg:w-96'>
            <div className='text-xl'>Đăng Ký</div>
            <form>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  className='w-full rounded border border-gray-300 p-3 text-sm outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Email'
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'></div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  name='password'
                  className='w-full rounded border border-gray-300 p-3 text-sm outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Password'
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'></div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  name='confirm_password'
                  className='w-full rounded border border-gray-300 p-3 text-sm outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Confirm Password'
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'></div>
              </div>
              <div className='mt-3'>
                <button className='bg-primary hover:bg-primary/90 w-full rounded px-2 py-4 text-center text-sm uppercase text-white'>
                  Đăng ký
                </button>
              </div>
            </form>
            <div className='mt-3 text-center text-xs'>
              <span>Bằng việc đăng kí, bạn đã đồng ý với Shopee về</span> <br />
              <span className='text-primary'>Điều khoản dịch vụ</span> &{' '}
              <span className='text-primary'>Chính sách bảo mật</span>
            </div>
            <div className='mt-7 flex items-center justify-center gap-1 text-sm'>
              <span className='text-black/25'>Bạn đã có tài khoản?</span>
              <Link to='/login' className='text-primary'>
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
