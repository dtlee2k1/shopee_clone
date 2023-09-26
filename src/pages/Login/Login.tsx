import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { getRules } from 'src/utils/rules'

interface IFormLogin {
  email: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormLogin>()

  const rules = getRules()

  const onSubmit = (data: IFormLogin) => {
    console.log(data)
  }

  return (
    <div className='bg-primary'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 md:grid-cols-5 md:pr-10'>
          <div className='hidden md:col-span-3 md:col-start-1 md:block '>
            <img src='/shopee-bg.webp' alt='Shopee Background' className='w-full bg-cover' />
          </div>
          <div className='mx-auto max-w-md rounded bg-white p-8 shadow-sm md:col-span-2 md:col-start-4 lg:w-96'>
            <div className='text-xl'>Đăng Nhập</div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='mt-8'>
                <input
                  type='email'
                  className={classNames('w-full rounded border p-3 text-sm outline-none focus:shadow-sm', {
                    'border-red-600 bg-red-50 focus:border-red-600': errors.email,
                    'border-gray-300 focus:border-gray-500': !errors.email
                  })}
                  placeholder='Email'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 min-h-[1rem] text-xs text-red-600'>{errors.email?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  autoComplete='on'
                  className={classNames('w-full rounded border p-3 text-sm outline-none focus:shadow-sm', {
                    'border-red-600 bg-red-50 focus:border-red-600': errors.password,
                    'border-gray-300 focus:border-gray-500': !errors.password
                  })}
                  placeholder='Password'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 min-h-[1rem] text-xs text-red-600'>{errors.password?.message}</div>
              </div>
              <div className='mt-3'>
                <button className='w-full rounded  bg-primary px-2 py-4 text-center text-sm uppercase text-white hover:bg-primary/90'>
                  Đăng nhập
                </button>
              </div>
            </form>
            <div className='mt-7 flex items-center justify-center gap-1 text-sm md:whitespace-nowrap'>
              <span className='text-black/25'>Bạn mới biết đến Shopee?</span>
              <Link to='/register' className='text-primary'>
                Đăng Ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
