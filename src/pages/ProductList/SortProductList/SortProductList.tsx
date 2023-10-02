export default function SortProductList() {
  return (
    <div className='bg-black/[0.03] px-5 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2 text-sm'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button className='h-[34px]  rounded-sm bg-primary px-4 capitalize leading-[34px] text-white [&:hover:not(:disabled)]:bg-primary [&:hover:not(:disabled)]:text-white'>
            Phổ biến
          </button>
          <button className='h-[34px] rounded-sm bg-white px-4 capitalize leading-[34px] text-black transition-all hover:bg-primary hover:text-white'>
            Mới nhất
          </button>
          <button className='h-[34px] rounded-sm bg-white px-4 capitalize leading-[34px] text-black hover:bg-primary hover:text-white'>
            Bán chạy
          </button>
          <div className='min-w-[12.5rem]'>
            <select
              defaultValue='default'
              className='h-[34px] w-full rounded-sm border-none bg-white px-4 capitalize leading-[34px] text-black outline-none'
            >
              <optgroup className='hidden'>
                <option value='default'>Giá</option>
              </optgroup>
              <option value='price:asc'>Giá: Thấp đến cao</option>
              <option value='price:desc'>Giá: Cao đến thấp</option>
            </select>
          </div>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-primary'>1</span>/<span>9</span>
          </div>
          <div className='ml-5'>
            <button className='h-[34px] w-9 cursor-not-allowed rounded-bl-sm rounded-tl-sm border border-black/10 bg-white px-3 opacity-40 shadow-sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3.5 w-3.5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='h-[34px] w-9 rounded-br-sm rounded-tr-sm border border-black/10 bg-transparent px-3 shadow-sm transition-all hover:bg-[#fdfdfd]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3.5 w-3.5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
