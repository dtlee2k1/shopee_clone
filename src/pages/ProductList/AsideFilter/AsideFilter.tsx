import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'

export default function AsideFilter() {
  return (
    <div className='py-4'>
      <Link to='/' className='flex items-center pb-1 text-base font-bold capitalize'>
        <svg viewBox='0 0 12 10' className='mr-2.5 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='my-2.5 h-[1px] bg-black/5'></div>
      <ul className='text-sm'>
        <li className='px-2.5 py-2 capitalize'>
          <Link to='/' className='relative font-bold text-primary'>
            <svg viewBox='0 0 4 7' className='absolute left-[-10px] top-1 h-2 w-2 fill-primary'>
              <polygon points='4 3.5 0 0 0 7' />
            </svg>
            Thời trang nam
          </Link>
        </li>
        <li className='px-2.5 py-2 capitalize'>
          <Link to='/' className='relative'>
            Áo khoác
          </Link>
        </li>
      </ul>
      <div className='mt-7 flex items-center pb-1 font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-2.5 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </div>
      <div className='my-2.5 h-[1px] bg-black/5'></div>
      <div className='py-2.5'>
        <div className='text-sm font-medium capitalize'>Khoảng giá</div>
        <form className='mt-5'>
          <div className='flex h-[30px]'>
            <Input
              type='text'
              name='from'
              placeholder='₫ TỪ'
              className='grow'
              classNameInput='w-full rounded border border-black/25 p-1 text-xs outline-none focus:shadow-sm h-full'
            />
            <div className='mx-2.5 mt-1 shrink-0 text-gray-300'>&ndash;</div>
            <Input
              type='text'
              name='to'
              placeholder='₫ ĐẾN'
              className='grow'
              classNameInput='w-full rounded border border-black/25 p-1 outline-none focus:shadow-sm text-xs h-full'
            />
          </div>
          <Button className='mt-5 h-[30px] w-full rounded-sm bg-primary px-1 text-center text-sm font-normal uppercase text-white outline-none hover:bg-primary/90'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='my-3 h-[1px] bg-black/5'></div>
      <div className='py-2.5'>
        <div className='text-sm font-medium capitalize'>Đánh giá</div>
        <div className='mt-2.5'>
          <Link to='/' className='flex items-center px-3 text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg key={index} viewBox='0 0 9.5 8' className='mr-1 h-3.5 w-3.5'>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth='{1}'>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
          </Link>
          <Link to='/' className='mt-2.5 flex items-center px-3 text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg key={index} viewBox='0 0 9.5 8' className='mr-1 h-3.5 w-3.5'>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth='{1}'>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span className=''>trở lên</span>
          </Link>
        </div>
      </div>
      <div className='my-3 h-[1px] bg-black/5'></div>
      <Button className='mt-2 h-[30px] w-full rounded-sm bg-primary px-1 text-center text-sm font-normal uppercase text-white outline-none hover:bg-primary/90'>
        Xóa tất cả
      </Button>
    </div>
  )
}
