import { useTranslation } from 'react-i18next'
import emptyProduct from 'src/assets/images/empty-product.png'

export default function EmptyProductList() {
  const { t } = useTranslation('home')
  return (
    <div className='mb-32 mt-24 flex flex-col items-center justify-center'>
      <img src={emptyProduct} alt='emptyProduct' className='w-36 object-cover' />
      <div className='text-sm text-black/90 sm:mt-4 sm:text-lg'>{t('empty_product.no_results_found')}</div>
      <div className='mt-2.5 text-center text-sm text-black/50 sm:text-lg'>{t('empty_product.general_keywords')}</div>
    </div>
  )
}
