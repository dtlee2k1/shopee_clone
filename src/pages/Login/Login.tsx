import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { LoginSchema, loginSchema } from 'src/utils/rules'
import Input from 'src/components/Input'
import { loginAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { toast } from 'react-toastify'
import { ResponseApi } from 'src/types/utils.type'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = LoginSchema

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body)
  })

  const onSubmit = (data: FormData) => {
    const body = omit(data, 'confirm_password')
    loginAccountMutation.mutate(body, {
      onSuccess: (data) => {
        toast.success(data.data.message)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
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
            <img src='/shopee-bg.webp' alt='Shopee Background' className='w-full bg-cover' />
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
