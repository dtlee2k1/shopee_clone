import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { getPurchases } from 'src/apis/purchase.api'
import { purchasesStatus } from 'src/constants/purchase'
import { formatCurrency, generateNameId } from 'src/utils/helpers'
import { useAddToCart } from 'src/pages/ProductDetail/useAddToCart'
import { PurchaseListStatus } from 'src/types/purchase.type'
import emptyPurchase from 'src/assets/images/empty-purchase.png'
import Loader from 'src/components/Loader'

export default function HistoryPurchase() {
  const navigate = useNavigate()
  const { t } = useTranslation('history_purchase')

  const [searchParams] = useSearchParams()
  const status = searchParams.get('status') ? Number(searchParams.get('status')) : purchasesStatus.all

  const purchaseTabs = [
    { status: purchasesStatus.all, name: t('all') },
    { status: purchasesStatus.waitForConfirmation, name: t('to_pay') },
    { status: purchasesStatus.waitForGetting, name: t('to_ship') },
    { status: purchasesStatus.inProgress, name: t('to_receive') },
    { status: purchasesStatus.delivered, name: t('completed') },
    { status: purchasesStatus.canceled, name: t('canceled') }
  ]

  const addToCartMutation = useAddToCart()

  // Get Purchases List Query
  const { data: purchasesInCartData, isLoading } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => getPurchases({ status: status as PurchaseListStatus })
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const handleBuyAgain = (productId: string, buyCount: number) => {
    addToCartMutation.mutate(
      { product_id: productId, buy_count: buyCount },
      {
        onSuccess: (data) => {
          navigate('/cart', {
            state: { purchaseId: data.data.data._id }
          })
        }
      }
    )
  }

  return (
    <div className='bg-neutral-100 shadow-sm'>
      <div className='overflow-x-auto sm:overflow-x-visible md:sticky md:top-0 md:z-[1]'>
        <div className='min-w-[600px] sm:min-w-fit '>
          <section className='mb-3 flex w-full overflow-hidden rounded-tl-sm rounded-tr-sm bg-white'>
            {purchaseTabs.map((tab) => (
              <Link
                key={tab.name}
                to={{
                  pathname: '/user/purchase',
                  search: createSearchParams({
                    status: String(tab.status)
                  }).toString()
                }}
                className={classNames(
                  'grow select-none truncate whitespace-nowrap border-b-2 bg-white py-3 text-center text-base',
                  {
                    'border-b-primary text-primary': status === tab.status,
                    'border-b-black/10 text-black/80': status !== tab.status
                  }
                )}
              >
                {tab.name}
              </Link>
            ))}
          </section>
        </div>
      </div>

      <div className='relative max-h-[800px] min-h-[500px] overflow-y-auto'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {purchasesInCart && purchasesInCart.length === 0 && (
              <div className='flex h-full min-h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-sm bg-white shadow-sm'>
                <img src={emptyPurchase} alt='empty purchase' className='h-[100px] w-[100px] object-cover' />
                <h2 className='mt-5 text-lg font-normal text-black/80'>Chưa có đơn hàng</h2>
              </div>
            )}
            {purchasesInCart &&
              purchasesInCart.length > 0 &&
              purchasesInCart.map((purchase) => (
                <div key={purchase._id} className='my-4 shadow-sm'>
                  <div className='rounded-sm bg-white px-4 py-3 sm:px-6'>
                    <Link
                      to={`/${generateNameId(purchase.product.name, purchase.product._id)}`}
                      className='flex items-center'
                    >
                      <div className='flex flex-grow flex-nowrap items-start sm:pr-3'>
                        <div className='shrink-0'>
                          <img
                            src={purchase.product.image}
                            alt={purchase.product.name}
                            className='h-20 w-20 border border-[#e1e1e1] bg-[#e1e1e1] object-cover'
                          />
                        </div>
                        <div className='flex flex-1 flex-col break-words pl-3'>
                          <div className='mb-2 line-clamp-2 max-h-[48px] text-base'>{purchase.product.name}</div>
                          <div className='mb-2 flex justify-between'>
                            <div className='text-sm'>x{purchase.buy_count}</div>
                            <div className='flex items-center sm:hidden'>
                              <span className='mr-[5px] max-w-[80px] truncate text-sm text-black/50 line-through'>
                                ₫{formatCurrency(purchase.price_before_discount)}
                              </span>
                              <span className='max-w-[80px] truncate text-sm text-primary'>
                                ₫{formatCurrency(purchase.price)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='ml-3 hidden text-right sm:block'>
                        <span className='mr-[5px] text-sm text-black/50 line-through'>
                          ₫{formatCurrency(purchase.price_before_discount)}
                        </span>
                        <span className='text-sm text-primary'>₫{formatCurrency(purchase.price)}</span>
                      </div>
                    </Link>
                  </div>
                  <div className='mt-[2px] rounded-sm bg-[#fffefb] px-4 py-6 sm:px-6'>
                    <div className='flex items-center justify-end'>
                      <span className='mr-1.5 cursor-pointer'>
                        <svg
                          width={16}
                          height={17}
                          viewBox='0 0 253 263'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <title>Shopee Guarantee</title>
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M126.5 0.389801C126.5 0.389801 82.61 27.8998 5.75 26.8598C5.08763 26.8507 4.43006 26.9733 3.81548 27.2205C3.20091 27.4677 2.64159 27.8346 2.17 28.2998C1.69998 28.7657 1.32713 29.3203 1.07307 29.9314C0.819019 30.5425 0.688805 31.198 0.689995 31.8598V106.97C0.687073 131.07 6.77532 154.78 18.3892 175.898C30.003 197.015 46.7657 214.855 67.12 227.76L118.47 260.28C120.872 261.802 123.657 262.61 126.5 262.61C129.343 262.61 132.128 261.802 134.53 260.28L185.88 227.73C206.234 214.825 222.997 196.985 234.611 175.868C246.225 154.75 252.313 131.04 252.31 106.94V31.8598C252.31 31.1973 252.178 30.5414 251.922 29.9303C251.667 29.3191 251.292 28.7649 250.82 28.2998C250.35 27.8358 249.792 27.4696 249.179 27.2225C248.566 26.9753 247.911 26.852 247.25 26.8598C170.39 27.8998 126.5 0.389801 126.5 0.389801Z'
                            fill='#ee4d2d'
                          />
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M207.7 149.66L119.61 107.03C116.386 105.472 113.914 102.697 112.736 99.3154C111.558 95.9342 111.772 92.2235 113.33 88.9998C114.888 85.7761 117.663 83.3034 121.044 82.1257C124.426 80.948 128.136 81.1617 131.36 82.7198L215.43 123.38C215.7 120.38 215.85 117.38 215.85 114.31V61.0298C215.848 60.5592 215.753 60.0936 215.57 59.6598C215.393 59.2232 215.128 58.8281 214.79 58.4998C214.457 58.1705 214.063 57.909 213.63 57.7298C213.194 57.5576 212.729 57.4727 212.26 57.4798C157.69 58.2298 126.5 38.6798 126.5 38.6798C126.5 38.6798 95.31 58.2298 40.71 57.4798C40.2401 57.4732 39.7735 57.5602 39.3376 57.7357C38.9017 57.9113 38.5051 58.1719 38.1709 58.5023C37.8367 58.8328 37.5717 59.2264 37.3913 59.6604C37.2108 60.0943 37.1186 60.5599 37.12 61.0298V108.03L118.84 147.57C121.591 148.902 123.808 151.128 125.129 153.884C126.45 156.64 126.797 159.762 126.113 162.741C125.429 165.72 123.755 168.378 121.363 170.282C118.972 172.185 116.006 173.221 112.95 173.22C110.919 173.221 108.915 172.76 107.09 171.87L40.24 139.48C46.6407 164.573 62.3785 186.277 84.24 200.16L124.49 225.7C125.061 226.053 125.719 226.24 126.39 226.24C127.061 226.24 127.719 226.053 128.29 225.7L168.57 200.16C187.187 188.399 201.464 170.892 209.24 150.29C208.715 150.11 208.2 149.9 207.7 149.66Z'
                            fill='#fff'
                          />
                        </svg>
                      </span>
                      <span className='mr-2.5 text-sm text-black/80'>{t('order_total')}:</span>
                      <span className='text-2xl text-primary'>
                        {formatCurrency(purchase.price * purchase.buy_count)}
                      </span>
                    </div>
                    <div className='flex items-center justify-end pt-6'>
                      <button
                        onClick={() => handleBuyAgain(purchase.product._id, purchase.buy_count)}
                        className='min-w-[150px] rounded-[4px] border border-[#cd3011] bg-primary px-2.5 py-2 text-sm font-normal text-white'
                      >
                        {t('buy_again')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  )
}
