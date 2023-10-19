import Input from 'src/components/Input'
import avatarDefault from 'src/assets/images/avatar-default.jpg'

export default function Profile() {
  return (
    <div className='rounded-sm bg-white px-4 pb-2.5 shadow md:px-7'>
      <div className='border-b border-b-[#efefef] py-4'>
        <h1 className='text-lg font-medium capitalize text-[#333]'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-[#555]'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className='flex flex-col-reverse gap-x-8 pt-8 md:flex-row md:items-start'>
        <form className='mt-8 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='whitespace-nowrap pt-0 text-sm text-[#555c] sm:w-[20%] sm:pt-3 md:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-sm text-[#333]'>le***********@gmail.com</div>
            </div>
          </div>
          <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
            <div className='whitespace-nowrap pt-0 text-sm text-[#555c] sm:w-[20%] sm:pt-3 md:text-right'>Tên</div>
            <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
              <Input classNameInput='w-full rounded border py-2 px-3 text-sm outline-none focus:shadow-sm' />
            </div>
          </div>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='whitespace-nowrap pt-0 text-sm text-[#555c] sm:w-[20%] sm:pt-3 md:text-right'>
              Số điện thoại
            </div>
            <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
              <Input classNameInput='w-full rounded border py-2 px-3 text-sm outline-none focus:shadow-sm' />
            </div>
          </div>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='whitespace-nowrap pt-0 text-sm text-[#555c] sm:w-[20%] sm:pt-3 md:text-right'>Địa chỉ</div>
            <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
              <Input classNameInput='w-full rounded border py-2 px-3 text-sm outline-none focus:shadow-sm' />
            </div>
          </div>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='whitespace-nowrap pt-0 text-sm text-[#555c] sm:w-[20%] sm:pt-3 md:text-right'>
              Ngày sinh
            </div>
            <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
              <div className='flex justify-between'>
                <select
                  value=''
                  className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-4  text-sm  outline-none hover:border-primary focus:border-primary '
                >
                  <optgroup className='hidden'>
                    <option value=''>Ngày</option>
                  </optgroup>
                </select>
                <select
                  value=''
                  className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-4 text-sm  outline-none hover:border-primary focus:border-primary '
                >
                  <optgroup className='hidden'>
                    <option value=''>Tháng</option>
                  </optgroup>
                </select>
                <select
                  value=''
                  className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-4 text-sm  outline-none hover:border-primary focus:border-primary '
                >
                  <optgroup className='hidden'>
                    <option value=''>Năm</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
          <div className='my-8 flex flex-wrap'>
            <div className='hidden sm:block sm:w-[20%]'></div>
            <div className='mx-auto sm:mx-0 sm:w-[80%] sm:pl-5'>
              <button className='h-10 min-w-[70px] rounded-sm bg-primary px-5 text-sm text-white hover:opacity-90'>
                Lưu
              </button>
            </div>
          </div>
        </form>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-[#efefef]'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-[6.25rem] w-[6.25rem]'>
              <img
                src={avatarDefault}
                alt='avatar'
                className='h-full w-full cursor-pointer rounded-full border border-black/10 bg-cover'
              />
            </div>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png'></input>
            <button
              type='button'
              className='h-10 min-w-[70px] truncate border border-black/10 bg-white px-5 text-sm text-[#555] shadow-sm outline-none hover:bg-black/[.02]'
            >
              Chọn ảnh
            </button>
            <div className='mt-3 text-sm text-[#999]'>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
