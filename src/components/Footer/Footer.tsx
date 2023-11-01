import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation('footer')
  return (
    <footer className=' bg-neutral-100'>
      <div className='m-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 gap-4 border-t border-t-black/10 py-10 text-sm text-black/50 lg:grid-cols-3 '>
          <div className='lg:col-span-1'>
            <div className='text-xs sm:text-sm'>
              &copy; {new Date().getFullYear()} {t('rights_reserved')}.
            </div>
          </div>
          <div className='lg:col-span-2'>
            <div className='flex flex-wrap gap-y-1 text-xs sm:text-sm'>
              <span className='px-1'>{t('countries')}</span>
              <div className='border-r border-r-black/20 px-1'>Singapore</div>
              <div className='border-r border-r-black/20 px-1'>Indonesia</div>
              <div className='border-r border-r-black/20 px-1'>Đài Loan</div>
              <div className='border-r border-r-black/20 px-1'>Thái Lan</div>
              <div className='border-r border-r-black/20 px-1'>Malaysia</div>
              <div className='border-r border-r-black/20 px-1'>Việt Nam</div>
              <div className='border-r border-r-black/20 px-1'>Philippines</div>
              <div className='border-r border-r-black/20 px-1'>Brazil</div>
              <div className='border-r border-r-black/20 px-1'>México</div>
              <div className='border-r border-r-black/20 px-1'>Colombia</div>
              <div className='px-1'>Chile</div>
            </div>
          </div>
        </div>
      </div>
      <div className='m-auto max-w-7xl px-4 py-7 text-xs text-black/50 sm:py-9'>
        <div className='mb-10 flex justify-center uppercase'>
          <div className='border-r border-r-black/10 px-3 sm:px-6'>{t('privacy_policy')}</div>
          <div className='border-r border-r-black/10 px-3 sm:px-6'>{t('term_of_service')}</div>
          <div className='border-r border-r-black/10 px-3 sm:px-6'>{t('shipping_policy')}</div>
          <div className='px-3 sm:px-6'>{t('violation')}</div>
        </div>
        <div className='m-auto mb-2 flex justify-center gap-10'>
          <div className="h-11 w-28 bg-[url('./assets/images/footer-registered.png')] bg-[length:551.6666666666666%_477.77777777777777%] bg-[14.391143911439114%_99.41176470588235%]"></div>
          <div className="h-11 w-28 bg-[url('./assets/images/footer-registered.png')] bg-[length:551.6666666666666%_477.77777777777777%] bg-[14.391143911439114%_99.41176470588235%]"></div>
          <div className="h-12 w-12 bg-[url('./assets/images/footer-registered.png')] bg-[length:1379.1666666666667%_447.9166666666667%] bg-[1.6286644951140066%_92.21556886227545%]"></div>
        </div>
        <div className='text-center text-xs text-black/60 '>
          <div className='mb-6'>{t('company_name')}</div>
          <div className='mt-2'>{t('address')}</div>
          <div className='mt-2'>{t('information_management')}</div>
          <div className='mt-2'>{t('business_registration_no')}</div>
          <div className='mt-2'>{t('copyright')}</div>
        </div>
      </div>
    </footer>
  )
}
