import emptyProduct from 'src/assets/images/empty-product.png'

export default function EmptyProductList() {
  return (
    <div className='mb-32 mt-24 flex flex-col items-center justify-center'>
      <img src={emptyProduct} alt='emptyProduct' className='w-36 object-cover' />
      <div className='text-sm text-black/90 sm:mt-4 sm:text-lg'>Không tìm thấy kết quả nào</div>
      <div className='mt-2.5 text-center text-sm text-black/50 sm:text-lg'>
        Hãy thử sử dụng các từ khóa chung chung hơn
      </div>
    </div>
  )
}
