import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { LoginSchema, loginSchema } from 'src/utils/rules'
import Input from 'src/components/Input'
import { login } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useApp } from 'src/contexts/app.context'
import Button from 'src/components/Button'

type FormData = LoginSchema

export default function Login() {
  const { setAuthenticated, setProfile } = useApp()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => login(body)
  })

  const onSubmit = (data: FormData) => {
    const body = omit(data, 'confirm_password')
    loginMutation.mutate(body, {
      onSuccess: (data) => {
        setAuthenticated(true)
        setProfile(data.data.data.user)

        navigate('/')
        toast.success(data.data.message)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                type: 'server',
                message: formError[key as keyof FormData]
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
          <div className='hidden md:col-span-3 md:col-start-1 md:block '>
            <img src='./images/shopee-bg.webp' alt='Shopee Background' className='w-full bg-cover' />
          </div>
          <div className='mx-auto max-w-md rounded bg-white p-8 shadow-sm md:col-span-2 md:col-start-4 lg:w-96'>
            <div className='text-xl'>Đăng Nhập</div>

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
              <div className='mt-3'>
                <Button
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                  className='w-full rounded bg-primary px-2 py-4 text-center text-sm uppercase text-white hover:bg-primary/90'
                >
                  Đăng nhập
                </Button>
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
