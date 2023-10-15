import { useNavigate } from 'react-router-dom'
import emptyCart from 'src/assets/images/empty-cart.png'

export default function EmptyCart() {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <div>
        <img src={emptyCart} alt='empty-cart' className='h-28 w-28 ' />
      </div>
      <div className='mt-4 text-sm font-bold text-black/40'>Giỏ hàng của bạn còn trống</div>
      <button
        className=' mt-4 h-9 rounded-sm bg-primary px-11 text-base font-light uppercase text-white outline-none transition-opacity hover:opacity-90'
        onClick={() => navigate('/')}
      >
        Mua ngay
      </button>
    </div>
  )
}
