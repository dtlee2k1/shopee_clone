import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { Category } from 'src/types/category.type'
import { PriceSchema, priceSchema } from 'src/utils/rules'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import InputNumber from 'src/components/InputNumber'
import Button from 'src/components/Button'
import RatingStars from '../RatingStars'

interface AsideFilterProps {
  queryConfig: QueryConfig
  categories: Category[]
  onCloseModal?: () => void
}

/**
 *  Rule validate
 *  If have both price_min & price_max => price_max >= price_min
 *  If have only one of the price_min or price_max => work as usual
 */
type FormData = PriceSchema

export default function AsideFilter({ queryConfig, categories, onCloseModal }: AsideFilterProps) {
  const navigate = useNavigate()
  const { t } = useTranslation('home')

  const { category } = queryConfig

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    reset
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    shouldFocusError: false,
    resolver: yupResolver(priceSchema)
  })

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        page: '1',
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const handleResetFilter = () => {
    navigate({
      pathname: '/',
      search: createSearchParams(omit(queryConfig, ['category', 'price_max', 'price_min', 'rating_filter'])).toString()
    })
    // clear(reset) the inputNumber
    reset()
  }

  const handleCloseModal = () => {
    onCloseModal && onCloseModal()
  }

  return (
    <div className='relative py-4'>
      <button className='absolute right-0 top-0 lg:hidden' onClick={handleCloseModal}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5 sm:h-6 sm:w-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>
      <Link to='/' className='flex items-center whitespace-nowrap pb-1 text-sm font-bold capitalize sm:text-base'>
        <svg viewBox='0 0 12 10' className='mr-2.5 h-3 w-3 shrink-0 fill-current sm:h-4 sm:w-3'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        {t('aside_filter.all_categories')}
      </Link>

      <div className='my-2.5 h-[1px] bg-black/5'></div>

      <ul className='text-xs sm:text-sm'>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id

          return (
            <li key={categoryItem._id} className='px-2.5 py-1.5 capitalize sm:py-2'>
              <Link
                to={{
                  pathname: '/',
                  search: createSearchParams({
                    ...queryConfig,
                    page: '1',
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative', {
                  'font-bold text-primary': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='absolute left-[-10px] top-1 h-2 w-2 fill-primary'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <div className='mt-7 flex items-center whitespace-nowrap pb-1 text-xs font-bold uppercase sm:text-sm'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-1 h-4 w-3 shrink-0 fill-current stroke-current xl:mr-2.5'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        {t('aside_filter.search_filter')}
      </div>

      <div className='my-2.5 h-[1px] bg-black/5'></div>

      <div className='py-2.5'>
        <div className='text-xs font-medium capitalize sm:text-sm'>{t('aside_filter.price_range')}</div>
        <form className='mt-5' onSubmit={onSubmit}>
          <div className='flex h-6 sm:h-[30px]'>
            <Controller
              control={control}
              name='price_min'
              render={({ field: { onChange, value, ref } }) => (
                <InputNumber
                  type='text'
                  placeholder={`₫ ${t('aside_filter.min')}`}
                  className='grow'
                  classNameError='hidden'
                  classNameInput='w-full rounded border shadow-sm border-black/25 focus:border-black/25 p-1 text-xs outline-none focus:shadow-sm h-full'
                  onChange={(e) => {
                    onChange(e)
                    trigger('price_max')
                  }}
                  value={value}
                  ref={ref}
                />
              )}
            />
            <div className='mx-2.5 mt-1 shrink-0 text-gray-300'>&ndash;</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field: { onChange, value, ref } }) => (
                <InputNumber
                  type='text'
                  placeholder={`₫ ${t('aside_filter.max')}`}
                  className='grow'
                  classNameError='hidden'
                  classNameInput='w-full rounded border shadow-sm border-black/25 focus:border-black/25  p-1 text-xs outline-none focus:shadow-sm h-full'
                  onChange={(e) => {
                    onChange(e)
                    trigger('price_min')
                  }}
                  value={value}
                  ref={ref}
                />
              )}
            />
          </div>
          {errors.price_min && (
            <div className='mt-2.5 min-h-[1rem] py-2.5 text-center text-xs text-red-600'>
              {errors.price_min?.message}
            </div>
          )}
          <Button className='mt-5 h-6 w-full rounded-sm bg-primary px-1 text-center text-xs font-normal uppercase text-white outline-none hover:bg-primary/90 sm:h-[30px] sm:text-sm'>
            {t('aside_filter.apply')}
          </Button>
        </form>
      </div>

      <div className='my-3 h-[1px] bg-black/5'></div>

      <div className='py-2.5'>
        <div className='text-xs font-medium capitalize sm:text-sm'>{t('aside_filter.rating')}</div>
        <RatingStars queryConfig={queryConfig} />
      </div>
      <div className='my-3 h-[1px] bg-black/5'></div>
      <Button
        className='mt-2 h-6 w-full rounded-sm bg-primary px-1 text-center text-xs font-normal uppercase text-white outline-none hover:bg-primary/90 sm:h-[30px] sm:text-sm'
        onClick={handleResetFilter}
      >
        {t('aside_filter.clear_all')}
      </Button>
    </div>
  )
}
