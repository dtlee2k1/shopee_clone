import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/helpers'

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  const { image, name, price_before_discount, price, sold, rating } = product

  return (
    <div className='z-[1] h-full overflow-visible rounded-sm bg-white text-black/[.87] shadow transition-transform duration-150 hover:translate-y-[-.0625rem] hover:shadow-md'>
      <Link to='/'>
        <div>
          <div className='relative w-full pt-[100%]'>
            <img
              className='absolute left-0 top-0 h-full w-full rounded-tl-sm rounded-tr-sm object-cover align-bottom'
              src={image}
              alt={name}
            />
          </div>
        </div>

        <div className='flex flex-col overflow-visible p-2'>
          <div className='line-clamp-2 min-h-[2rem] break-words text-xs'>{name}</div>

          <div className='mt-2 flex items-baseline'>
            <div className='mr-[5px] max-w-[50%] truncate text-sm text-black/50 line-through'>
              <span>₫</span>
              <span>{formatCurrency(price_before_discount)}</span>
            </div>
            <div className='max-w-[50%] truncate text-primary'>
              <span className='text-xs'>₫</span>
              <span className='text-base'>{formatCurrency(price)}</span>
            </div>
          </div>

          <div className='mt-2 flex items-center justify-end'>
            <div className='flex items-center'>
              <ProductRating rating={rating} />
            </div>
            <div className='ml-1 text-xs'>Đã bán {formatNumberToSocialStyle(sold)}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}
