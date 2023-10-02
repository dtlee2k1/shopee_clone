import { Link } from 'react-router-dom'

export default function Product() {
  return (
    <div className='z-[1] h-full overflow-visible rounded-sm bg-white text-black/[.87] shadow transition-transform duration-150 hover:translate-y-[-.0625rem] hover:shadow-md'>
      <Link to='/'>
        <div>
          <div className='relative h-full w-full pt-[100%]'>
            <img
              className='absolute left-0 top-0 rounded-tl-sm rounded-tr-sm object-cover align-bottom'
              src='https://down-vn.img.susercontent.com/file/0eaf0168e6e28ab74f6bc33f26847d2c_tn'
              alt=''
            />
          </div>
        </div>

        <div className='flex flex-col overflow-visible p-2'>
          <div className='line-clamp-2 min-h-[2rem] break-words text-xs'>
            Áo Cardigan Nam Áo Khoác Ngoài Chất Liệu Dày Dặn Sang Trọng
          </div>

          <div className='mt-2 flex items-baseline'>
            <div className='mr-[5px] max-w-[50%] truncate text-sm text-black/50 line-through'>
              <span>₫</span>
              <span>110.000</span>
            </div>
            <div className='max-w-[50%] truncate text-primary'>
              <span className='text-xs'>₫</span>
              <span className='text-base'>159.000</span>
            </div>
          </div>

          <div className='mt-2 flex items-center justify-end'>
            <div className='flex items-center'>
              <div className='relative'>
                <div className='absolute left-0 top-0 h-full overflow-hidden' style={{ width: '50%' }}>
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='h-2.5 w-2.5 fill-yellow-300 text-yellow-300'
                  >
                    <polygon
                      points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit={10}
                    />
                  </svg>
                </div>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className='h-2.5 w-2.5 fill-current text-gray-300'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
            </div>
            <div className='ml-1 text-xs'>Đã bán 5,66k</div>
          </div>
        </div>
      </Link>
    </div>
  )
}
