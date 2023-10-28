import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface InputFileProps {
  onSetFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

export default function InputFile({ onSetFile }: InputFileProps) {
  const { t } = useTranslation('profile')

  const fileInputRef = useRef<HTMLInputElement>(null)

  // IMAGE UPLOAD
  // Flow 1:
  //  Click `Upload` Button: upload image directly to server => Server return image URL
  //  Click `Submit` Button: Send image URL + data to server
  // Flow 2:
  //  Click `Upload` Button: image is not uploaded to server
  //  Click `Submit` Button: proceed to upload to server. If upload successfully then call api `updateProfile`
  const handleUploadImage = () => {
    // use `fileInputRef` as a reference to an `input type file` to upload an image with a `button`
    fileInputRef.current?.click()
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0]

    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('Dụng lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG')
    } else {
      onSetFile(fileFromLocal)
    }
  }

  return (
    <>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(e) => ((e.target as HTMLInputElement).value = '')}
      ></input>
      <button
        type='button'
        className='h-10 min-w-[70px] truncate border border-black/10 bg-white px-5 text-sm text-[#555] shadow-sm outline-none hover:bg-black/[.02]'
        onClick={handleUploadImage}
      >
        {t('select_image')}
      </button>
      <div className='mt-3 text-sm text-[#999]'>
        <div>{t('file_size_required')}</div>
        <div>{t('file_extension_required')}</div>
      </div>
    </>
  )
}
