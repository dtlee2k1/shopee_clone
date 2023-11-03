import { useMemo, useRef, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import DOMPurify from 'dompurify'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { convert } from 'html-to-text'
import { motion } from 'framer-motion'

import { useProduct } from './useProduct'
import { getProducts } from 'src/apis/product.api'
import { ProductListConfig } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, rateSale } from 'src/utils/helpers'
import ProductRating from 'src/components/ProductRating'
import Product from '../ProductList/components/Product'
import QuantityController from 'src/components/QuantityController'
import { useAddToCart } from './useAddToCart'
import { useNavigate } from 'react-router-dom'
import Loader from 'src/components/Loader'

export default function ProductDetail() {
  const navigate = useNavigate()
  const { t } = useTranslation('product')

  // get product details
  const { product, isLoading: isLoading1 } = useProduct()

  const addToCartMutation = useAddToCart()

  // state for handle images slider
  const [currentIndexImages, setCurrentIndexImages] = useState<number[]>([0, 5])
  const [activeImage, setActiveImage] = useState<number>(0)

  const imageRef = useRef<HTMLImageElement>(null)

  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [currentIndexImages, product]
  )

  // Quantity of Product Controller
  const [buyCount, setBuyCount] = useState<number>(1)

  // Height of product description
  const [isShow, setIsShow] = useState<boolean>(false)

  useEffect(() => {
    setIsShow(false)
  }, [product?._id])

  // Get relevant products by category equivalents
  const queryConfig: ProductListConfig = { limit: 20, page: 1, category: product?.category._id }
  const { data: productsData, isLoading: isLoading2 } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => getProducts(queryConfig),
    enabled: Boolean(product) // only fetch when `product` exists
  })

  if (isLoading1 && isLoading2) return <Loader />

  // Destructuring product data
  const { _id, name, description, images, rating, sold, price, price_before_discount, quantity } = product

  const handleActiveImage = (index: number) => {
    setActiveImage(index)
  }

  const handleNextImages = () => {
    if (currentIndexImages[1] < images.length) setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
  }

  const handlePrevImages = () => {
    if (currentIndexImages[0] > 0) setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
  }

  const handleZoomIn = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const { offsetY, offsetX } = e.nativeEvent

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    image.style.height = naturalHeight + 'px'
    image.style.width = naturalWidth + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { product_id: _id, buy_count: buyCount },
      {
        onSuccess: (data) => {
          toast.success(data.data.message)
        }
      }
    )
  }

  const handleBuyNow = () => {
    addToCartMutation.mutate(
      { product_id: _id, buy_count: buyCount },
      {
        onSuccess: (data) => {
          navigate('/cart', {
            state: { purchaseId: data.data.data._id }
          })
        }
      }
    )
  }

  const handleShowDesc = () => {
    setIsShow(!isShow)
  }
  return (
    <div className='bg-neutral-100 py-6'>
      <Helmet>
        <title>{product.name} | Shopee Clone</title>
        <meta name='description' content={convert(product.description).slice(0, 100) + '...'} />
      </Helmet>
      <div className='container'>
        <div className='mt-5 bg-white p-4 shadow-sm'>
          <section className='grid grid-cols-1 gap-3 sm:grid-cols-12 sm:gap-9'>
            <div className='col-span-full sm:col-span-5'>
              <div
                className='pointer-events-none relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow-sm lg:pointer-events-auto'
                onMouseMove={handleZoomIn}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  className='pointer-events-none absolute left-0 top-0 h-full w-full rounded-tl-sm rounded-tr-sm object-cover align-bottom'
                  src={images[activeImage]}
                  alt={name}
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid cursor-pointer grid-cols-5 gap-1'>
                {currentImages.slice(0, 5).map((image, index) => {
                  const isActive = index === activeImage
                  return (
                    <div
                      key={image}
                      className='relative w-full pt-[100%] shadow-sm'
                      onMouseEnter={() => handleActiveImage(index)}
                    >
                      <img
                        className='absolute left-0 top-0 h-full w-full cursor-pointer rounded-tl-sm rounded-tr-sm object-cover align-bottom'
                        src={image}
                        alt={name}
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-primary'></div>}
                    </div>
                  )
                })}
                <button
                  className='absolute left-0 top-1/2 z-10 h-6 w-3 -translate-y-1/2 bg-black/20 text-white sm:h-10 sm:w-5'
                  onClick={handlePrevImages}
                >
                  <svg
                    enableBackground='new 0 0 13 20'
                    viewBox='0 0 13 20'
                    x={0}
                    y={0}
                    className='h-3 w-3 fill-current sm:h-5 sm:w-5'
                  >
                    <polygon points='4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9' />
                  </svg>
                </button>
                <button
                  className='absolute right-0 top-1/2 z-10 h-6 w-3 -translate-y-1/2 bg-black/20 text-white sm:h-10 sm:w-5'
                  onClick={handleNextImages}
                >
                  <svg
                    enableBackground='new 0 0 13 21'
                    viewBox='0 0 13 21'
                    x={0}
                    y={0}
                    className='h-3 w-3 fill-current sm:h-5 sm:w-5'
                  >
                    <polygon points='11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-full sm:col-span-7 sm:py-1 sm:pr-5'>
              <h1 className='break-words text-base font-medium sm:text-xl'>{name}</h1>
              <div className='mt-3 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1.5 border-b border-b-primary text-sm text-primary sm:text-base'>{rating}</span>
                  <div className='mb-0.5 flex items-center'>
                    <ProductRating
                      rating={rating}
                      activeClassName='h-3 w-3 sm:h-4 sm:w-4 fill-primary text-primary'
                      nonActiveClassName='h-3 w-3 sm:h-4 sm:w-4 fill-current text-gray-300'
                    />
                  </div>
                </div>
                <div className='mx-4 h-6 w-[1px] bg-black/[.14]'></div>
                <div className='flex items-baseline'>
                  <span className='mr-1.5 text-sm text-black sm:text-base'>{formatNumberToSocialStyle(sold)}</span>
                  <span className='text-xs capitalize text-gray-500 sm:text-sm'>{t('sold')}</span>
                </div>
              </div>
              <div className='mt-3 flex items-center justify-center bg-neutral-50 px-4 py-5 sm:justify-start'>
                <div className='mr-2.5 text-sm text-black/50 line-through sm:text-base'>
                  <span>₫</span>
                  <span>{formatCurrency(price_before_discount)}</span>
                </div>
                <div className='flex items-center text-lg text-primary sm:text-3xl'>
                  <span>₫</span>
                  <span>{formatCurrency(price)}</span>
                  <span className='ml-4 whitespace-nowrap rounded-sm bg-primary px-1 py-0.5 text-xs font-semibold uppercase text-white'>
                    {rateSale(price_before_discount, price)} {t('sale-off')}
                  </span>
                </div>
              </div>
              <div className='mt-4 flex items-center justify-center sm:mt-8 sm:justify-start'>
                <h3 className='mr-4 whitespace-nowrap text-xs font-normal capitalize text-gray-500 sm:mr-10 sm:text-sm '>
                  {t('quantity')}
                </h3>
                <div className='flex items-center sm:items-baseline'>
                  <QuantityController
                    max={quantity}
                    value={buyCount}
                    onDecrease={handleBuyCount}
                    onIncrease={handleBuyCount}
                    onVary={handleBuyCount}
                  />
                  <div className='text-xs text-gray-500  sm:text-sm'>
                    {quantity} {t('pieces_available')}
                  </div>
                </div>
              </div>
              <div className='mt-8 flex items-center justify-center sm:justify-start'>
                <button
                  className='flex h-10 max-w-[250px] items-center rounded-sm border border-primary bg-[#ff57221a] px-2.5 capitalize text-primary shadow-sm outline-none hover:bg-[#ffc5b22e] sm:h-12 sm:px-5'
                  onClick={handleAddToCart}
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-2.5 h-5 w-5 flex-shrink-0 fill-current stroke-current text-current'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  <span className='whitespace-nowrap text-xs sm:text-sm'>{t('add_to_cart')}</span>
                </button>
                <button
                  className='ml-4 h-10 w-28 max-w-[250px] whitespace-nowrap rounded-sm border-none bg-primary px-2.5 text-xs capitalize text-white shadow-sm outline-none hover:opacity-90 sm:h-12 sm:w-44 sm:px-5 sm:text-sm'
                  onClick={handleBuyNow}
                >
                  {t('buy_now')}
                </button>
              </div>
              <div className='mt-8 border-t border-t-black/5'></div>
            </div>
          </section>
        </div>
        <div className='mt-4 rounded-sm bg-white p-2.5 shadow-sm'>
          <section className='p-3.5'>
            <h2 className='bg-black/[.02] p-3.5 text-base uppercase sm:text-lg'>{t('product_description')}</h2>
            <div className='mx-4 my-2.5 overflow-hidden text-xs leading-loose sm:mt-8 sm:text-sm'>
              <motion.div
                animate={isShow ? 'open' : 'closed'}
                variants={{
                  open: { height: '100%', overflow: 'hidden' },
                  closed: { height: 217 + 'px', overflow: 'hidden' }
                }}
                transition={{ duration: 0.3 }}
                dangerouslySetInnerHTML={{
                  // Using DOMPurify to prevent XSS attacks because if we render as usual then maybe sometimes in this render contains HTML + `JS` => Hacker can steal access token from user. Therefore DomPurify can be fed with string full of dirty HTML and it will return a string (unless configured otherwise) with clean HTML
                  __html: DOMPurify.sanitize(description)
                }}
              ></motion.div>
              <div className='m-auto mt-4 flex w-full justify-center border-t border-t-gray-300 pt-4'>
                {isShow ? (
                  <button
                    className='flex items-center justify-center gap-1 text-primary hover:opacity-90'
                    onClick={handleShowDesc}
                  >
                    {t('show_less')}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-4 w-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
                    </svg>
                  </button>
                ) : (
                  <button
                    className='flex items-center justify-center gap-1 text-primary hover:opacity-90'
                    onClick={handleShowDesc}
                  >
                    {t('show_more')}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-4 w-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
        {productsData && (
          <div className='mt-8'>
            <section>
              <h2 className='text-base font-medium uppercase text-black/[.54]'>{t('relevant-items')}</h2>
              <div className='mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                {productsData.data.data.products
                  .filter((product) => product._id !== _id)
                  .map((product) => (
                    <div key={product._id} className='col-span-1'>
                      <Product product={product} />
                    </div>
                  ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
