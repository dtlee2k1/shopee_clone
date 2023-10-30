import { useState, useEffect, useMemo } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'

import { toast } from 'react-toastify'

import { updateProfile, uploadAvatar } from 'src/apis/user.api'
import { useApp } from 'src/contexts/app.context'
import { useProfile } from '../../hooks/useProfile'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { getAvatarUrl } from 'src/utils/helpers'
import { setProfileToLS } from 'src/utils/auth'
import InputNumber from 'src/components/InputNumber'
import DateSelect from '../../components/DateSelect'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputFile from 'src/components/InputFile'
import Loader from 'src/components/Loader'

type FormData = Pick<UserSchema, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = userSchema.pick(['name', 'phone', 'address', 'date_of_birth', 'avatar'])

export default function Profile() {
  const queryClient = useQueryClient()
  const { t } = useTranslation('profile')

  const { setProfile } = useApp()
  const { profile, isLoading } = useProfile()

  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: uploadAvatar
  })

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1),
      avatar: ''
    }
  })

  // get avatarName after rendering
  const avatar = watch('avatar')

  // Filled fields of form data if `profile` data is available
  useEffect(() => {
    if (profile) {
      setValue('name', profile?.name || '')
      setValue('phone', profile?.phone || '')
      setValue('address', profile?.address || '')
      setValue('avatar', profile?.avatar || '')
      setValue('date_of_birth', profile?.date_of_birth ? new Date(profile?.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data

        setValue('avatar', avatarName)
      }

      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      queryClient.invalidateQueries(['profile'])
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data

        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              type: 'server',
              message: formError[key as keyof FormDataError]
            })
          })
        }
      }
    }
  })

  return (
    <>
      {isLoading && (
        <div className='min-h-[480px]'>
          <Loader />
        </div>
      )}
      {!isLoading && (
        <div className='rounded-sm bg-white px-4 pb-2.5 shadow md:px-7'>
          <div className='border-b border-b-[#efefef] py-4'>
            <h1 className='text-lg font-medium capitalize text-[#333]'>{t('my_profile')}</h1>
            <div className='mt-1 text-sm text-[#555]'>{t('desc')}</div>
          </div>
          <form onSubmit={onSubmit} className='flex flex-col-reverse gap-x-8 pt-8 lg:flex-row lg:items-start'>
            <div className='mt-8 flex-grow md:pr-12 lg:mt-0'>
              <div className='flex flex-col flex-wrap sm:flex-row'>
                <div className='whitespace-nowrap pt-0 text-sm text-[#555c] sm:w-[20%] sm:pt-2 md:text-right'>
                  {t('email')}
                </div>
                <div className='sm:w-[80%] sm:pl-5'>
                  <div className='pt-2 text-sm text-[#333]'>{profile?.email}</div>
                </div>
              </div>
              <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
                <div className='whitespace-nowrap pt-0 text-sm text-[#555c] sm:w-[20%] sm:pt-2 md:text-right'>
                  {t('name')}
                </div>
                <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
                  <Input
                    type='text'
                    name='name'
                    placeholder='Name'
                    register={register}
                    errorMessage={errors.name?.message}
                    classNameInput='w-full rounded border py-2 px-3 text-sm outline-none focus:shadow-sm'
                  />
                </div>
              </div>
              <div className='flex flex-col flex-wrap sm:flex-row'>
                <div className='whitespace-nowrap pt-0 text-sm text-[#555c] sm:w-[20%] sm:pt-2 md:text-right'>
                  {t('phone_number')}
                </div>
                <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
                  <Controller
                    control={control}
                    name='phone'
                    render={({ field: { onChange, value } }) => (
                      <InputNumber
                        type='text'
                        placeholder='Phone Number'
                        errorMessage={errors.phone?.message}
                        classNameInput='w-full rounded border py-2 px-3 text-sm outline-none focus:shadow-sm'
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                </div>
              </div>
              <div className='flex flex-col flex-wrap sm:flex-row'>
                <div className='whitespace-nowrap pt-0 text-sm text-[#555c] sm:w-[20%] sm:pt-2 md:text-right'>
                  {t('address')}
                </div>
                <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
                  <Input
                    type='text'
                    name='address'
                    placeholder='Address'
                    register={register}
                    errorMessage={errors.address?.message}
                    classNameInput='w-full rounded border py-2 px-3 text-sm outline-none focus:shadow-sm'
                  />
                </div>
              </div>
              <div className='flex flex-col flex-wrap sm:flex-row'>
                <div className='whitespace-nowrap pt-0 text-sm text-[#555c] sm:w-[20%] sm:pt-2 md:text-right'>
                  {t('date_of_birth')}
                </div>
                <Controller
                  control={control}
                  name='date_of_birth'
                  render={({ field: { onChange, value } }) => (
                    <DateSelect errorMessage={errors.date_of_birth?.message} onChange={onChange} value={value} />
                  )}
                />
              </div>
              <div className='mb-8 mt-4 flex flex-wrap'>
                <div className='hidden sm:block sm:w-[20%]'></div>
                <div className='mx-auto sm:mx-0 sm:w-[80%] sm:pl-5'>
                  <Button
                    type='submit'
                    className='h-10 min-w-[70px] rounded-sm bg-primary px-5 text-sm text-white hover:opacity-90'
                  >
                    {t('save')}
                  </Button>
                </div>
              </div>
            </div>
            <div className='flex justify-center lg:w-72 lg:border-l lg:border-l-[#efefef]'>
              <div className='flex flex-col items-center'>
                <div className='my-5 h-[6.25rem] w-[6.25rem]'>
                  <img
                    src={previewImage || getAvatarUrl(avatar)}
                    alt='avatar'
                    className='aspect-square h-full w-full cursor-pointer rounded-full border border-black/10 object-cover'
                  />
                </div>

                <InputFile onSetFile={setFile} />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
