import { useMemo, useRef, useState } from 'react'
import InputNumber from 'src/components/InputNumber/InputNumber'
import { useProduct } from './useProduct'
import ProductRating from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, rateSale } from 'src/utils/helpers'
import DOMPurify from 'dompurify'

export default function ProductDetail() {
  const { product, isLoading } = useProduct()

  const [currentIndexImages, setCurrentIndexImages] = useState<number[]>([0, 5])
  const [activeImage, setActiveImage] = useState<number>(0)

  const imageRef = useRef<HTMLImageElement>(null)

  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [currentIndexImages, product]
  )

  if (isLoading) return null

  const { name, description, images, rating, sold, price, price_before_discount, quantity } = product

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

  return (
    <div className='bg-neutral-100 py-6'>
      <div className='container'>
        <div className='mt-5 bg-white p-4 shadow-sm'>
          <section className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow-sm'
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
                  className='absolute left-0 top-1/2 z-10 h-10 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={handlePrevImages}
                >
                  <svg
                    enableBackground='new 0 0 13 20'
                    viewBox='0 0 13 20'
                    x={0}
                    y={0}
                    className='h-5 w-5 fill-current'
                  >
                    <polygon points='4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9' />
                  </svg>
                </button>
                <button
                  className='absolute right-0 top-1/2 z-10 h-10 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={handleNextImages}
                >
                  <svg
                    enableBackground='new 0 0 13 21'
                    viewBox='0 0 13 21'
                    x={0}
                    y={0}
                    className='h-5 w-5 fill-current'
                  >
                    <polygon points='11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7 py-1 pr-5'>
              <h1 className='break-words text-xl font-medium'>{name}</h1>
              <div className='mt-3 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1.5 border-b border-b-primary text-base text-primary'>{rating}</span>
                  <div className='mb-0.5 flex items-center'>
                    <ProductRating
                      rating={rating}
                      activeClassName='h-4 w-4 fill-primary text-primary'
                      nonActiveClassName='h-4 w-4 fill-current text-gray-300'
                    />
                  </div>
                </div>
                <div className='mx-4 h-6 w-[1px] bg-black/[.14]'></div>
                <div className='flex items-baseline'>
                  <span className='mr-1.5  text-base text-black'>{formatNumberToSocialStyle(sold)}</span>
                  <span className=' text-sm capitalize text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-3 flex items-center bg-neutral-50 px-4 py-5'>
                <div className='mr-2.5 text-base text-black/50 line-through'>
                  <span>₫</span>
                  <span>{formatCurrency(price_before_discount)}</span>
                </div>
                <div className='flex items-center text-3xl text-primary'>
                  <span>₫ </span>
                  <span>{formatCurrency(price)}</span>
                  <span className='ml-4 whitespace-nowrap rounded-sm bg-primary px-1 py-0.5 text-xs font-semibold uppercase text-white'>
                    {rateSale(price_before_discount, price)} giảm
                  </span>
                </div>
              </div>
              <div className='mt-8 flex place-items-center'>
                <h3 className='mr-10 text-sm font-normal capitalize text-gray-500'>Số lượng</h3>
                <div className='flex items-baseline'>
                  <div className='mr-4 flex'>
                    <button className='h-8 w-8 rounded-l-sm border border-black/10 bg-transparent text-black/80 outline-none'>
                      &minus;
                    </button>

                    <InputNumber
                      type='text'
                      value={1}
                      classNameInput='h-8 w-14 border border-x-0 border-black/10 bg-transparent text-center'
                      classNameError='hidden'
                    />

                    <button className='h-8 w-8 rounded-r-sm border border-black/10 bg-transparent text-black/80 outline-none'>
                      &#43;
                    </button>
                  </div>
                  <div className='text-sm text-gray-500'>{quantity} sản phẩm có sẵn</div>
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <button className='flex h-12 max-w-[250px] items-center rounded-sm border border-primary bg-[#ff57221a] px-5 capitalize text-primary shadow-sm outline-none hover:bg-[#ffc5b22e]'>
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-2.5 h-5 w-5 fill-current stroke-current text-current'
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
                  <span className='text-sm'>Thêm vào giỏ hàng</span>
                </button>
                <button className='ml-4 h-12 w-44 max-w-[250px] rounded-sm border-none bg-primary px-5 capitalize text-white shadow-sm outline-none hover:opacity-90'>
                  <span className='text-sm'>Mua ngay</span>
                </button>
              </div>
              <div className='mt-8 border-t border-t-black/5'></div>
            </div>
          </section>
        </div>
        <div className='mt-4 rounded-sm bg-white p-2.5 shadow-sm'>
          <section className='p-3.5'>
            <h2 className='bg-black/[.02] p-3.5 text-lg uppercase'>Mô tả sản phẩm</h2>
            <div className='mx-4 mb-4 mt-8 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  // Using DOMPurify to prevent XSS attacks because if we render as usual then maybe sometimes in this render contains HTML + `JS` => Hacker can steal access token from user. Therefore DomPurify can be fed with string full of dirty HTML and it will return a string (unless configured otherwise) with clean HTML
                  __html: DOMPurify.sanitize(description)
                }}
              ></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
