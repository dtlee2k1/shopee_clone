import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { toast } from 'react-toastify'

import { useApp } from 'src/contexts/app.context'
import { register as registerAccount } from 'src/apis/auth.api'
import { RegisterSchema, registerSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import logoBackground from 'src/assets/images/shopee-bg.webp'

type FormData = RegisterSchema

export default function Register() {
  const { setAuthenticated, setProfile } = useApp()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = (data: FormData) => {
    const body = omit(data, 'confirm_password')
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        setAuthenticated(true)
        setProfile(data.data.data.user)

        navigate('/')
        toast.success(data.data.message)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                type: 'server',
                message: formError[key as keyof Omit<FormData, 'confirm_password'>]
              })
            })
          }
        }
      }
    })
  }
  return (
    <div className='bg-primary'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 md:grid-cols-5 md:pr-10'>
          <div className='hidden md:col-span-3 md:block '>
            <img src={logoBackground} alt='Shopee' className='w-full bg-cover' />
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
                <Button
                  isLoading={registerMutation.isLoading}
                  disabled={registerMutation.isLoading}
                  className='w-full rounded bg-primary px-2 py-4 text-center text-sm uppercase text-white hover:bg-primary/90'
                >
                  Đăng ký
                </Button>
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
