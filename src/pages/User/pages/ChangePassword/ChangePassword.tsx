import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'

import { toast } from 'react-toastify'
import omit from 'lodash/omit'

import { updateProfile } from 'src/apis/user.api'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import Button from 'src/components/Button'
import Input from 'src/components/Input'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>

const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const { t } = useTranslation('change_password')

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })

  const updateProfileMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => updateProfile(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, 'confirm_password')
    updateProfileMutation.mutate(body, {
      onSuccess: (data) => {
        reset()
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
  })

  return (
    <div className='rounded-sm bg-white px-4 pb-20 shadow md:px-7'>
      <div className='border-b border-b-[#efefef] py-4'>
        <h1 className='text-lg font-medium capitalize text-[#333]'>{t('set_password')}</h1>
        <div className='mt-1 text-sm text-[#555]'>{t('desc')}</div>
      </div>
      <form className='pt-8 lg:items-start' onSubmit={onSubmit}>
        <div className='mt-4 flex-grow lg:mt-0'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='whitespace-nowrap pt-0 text-sm capitalize text-[#555c] sm:w-[25%] sm:pt-2 md:text-right'>
              {t('current_password')}
            </div>
            <div className='mt-2 sm:mt-0 sm:w-[70%] sm:pl-5 lg:w-[50%]'>
              <Input
                type='password'
                name='password'
                placeholder='Password'
                register={register}
                errorMessage={errors.password?.message}
                classNameInput='w-full rounded border py-2 px-3 text-sm outline-none focus:shadow-sm'
                className='relative'
              />
            </div>
          </div>
          <div className='mt-1 flex flex-col flex-wrap sm:flex-row'>
            <div className='whitespace-nowrap pt-0 text-sm capitalize text-[#555c] sm:w-[25%] sm:pt-2 md:text-right'>
              {t('new_password')}
            </div>
            <div className='mt-2 sm:mt-0 sm:w-[70%] sm:pl-5 lg:w-[50%]'>
              <Input
                type='password'
                name='new_password'
                placeholder='New Password'
                register={register}
                errorMessage={errors.new_password?.message}
                classNameInput='w-full rounded border py-2 px-3 text-sm outline-none focus:shadow-sm'
                className='relative'
              />
            </div>
          </div>
          <div className='mt-1 flex flex-col flex-wrap sm:flex-row'>
            <div className='whitespace-nowrap pt-0 text-sm capitalize text-[#555c] sm:w-[25%] sm:pt-2 md:text-right'>
              {t('confirm_password')}
            </div>
            <div className='mt-2 sm:mt-0 sm:w-[70%] sm:pl-5 lg:w-[50%]'>
              <Input
                type='password'
                name='confirm_password'
                placeholder='Confirm Password'
                register={register}
                errorMessage={errors.confirm_password?.message}
                classNameInput='w-full rounded border py-2 px-3 text-sm outline-none focus:shadow-sm'
                className='relative'
              />
            </div>
          </div>

          <div className='mb-8 mt-4 flex flex-wrap'>
            <div className='hidden sm:block sm:w-[25%]'></div>
            <div className='mx-auto sm:mx-0 sm:pl-5'>
              <Button
                type='submit'
                className='h-10 min-w-[70px] rounded-sm bg-primary px-5 text-sm text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-25'
              >
                {t('confirm')}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
