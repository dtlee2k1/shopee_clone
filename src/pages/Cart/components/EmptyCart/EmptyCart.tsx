import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import emptyCart from 'src/assets/images/empty-cart.png'

export default function EmptyCart() {
  const navigate = useNavigate()
  const { t } = useTranslation('cart')

  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <div>
        <img src={emptyCart} alt='empty-cart' className='h-28 w-28 ' />
      </div>
      <div className='mt-4 text-sm font-bold text-black/40'>{t('empty_cart.empty_shopping_cart')}</div>
      <button
        className=' mt-4 h-9 rounded-sm bg-primary px-11 text-base font-light  capitalize text-white outline-none transition-opacity hover:opacity-90'
        onClick={() => navigate('/')}
      >
        {t('empty_cart.shopping_now')}
      </button>
    </div>
  )
}
