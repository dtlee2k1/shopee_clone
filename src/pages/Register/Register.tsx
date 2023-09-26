import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Schema, schema } from 'src/utils/rules'
import Input from 'src/components/Input'
import { registerAccount } from 'src/apis/auth.api'

type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const { mutate } = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = (data: FormData) => {
    mutate({ email: data.email, password: data.password })
  }
  return (
    <div className='bg-primary'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 md:grid-cols-5 md:pr-10'>
          <div className='hidden md:col-span-3  md:block '>
            <img src='/shopee-bg.webp' alt='Shopee' className='w-full bg-cover' />
          </div>
          <div className='mx-auto max-w-md rounded bg-white p-8 shadow-sm md:col-span-2 md:col-start-4 lg:w-96'>
            <div className='text-xl'>Đăng Ký</div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Input
                className='mt-8'
                type='email'
                name='email'
                placeholder='Email'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                className='mt-3'
                type='password'
                name='password'
                placeholder='Password'
                autoComplete='on'
                register={register}
                errorMessage={errors.password?.message}
              />
              <Input
                className='mt-3'
                type='password'
                name='confirm_password'
                placeholder='Confirm Password'
                autoComplete='on'
                register={register}
                errorMessage={errors.confirm_password?.message}
              />
              <div className='mt-3'>
                <button className='w-full rounded bg-primary px-2 py-4 text-center text-sm uppercase text-white hover:bg-primary/90'>
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
