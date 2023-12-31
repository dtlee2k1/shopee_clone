import { createSearchParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import omit from 'lodash/omit'
import classNames from 'classnames'
import { sortBy } from 'src/constants/product'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { usePagination } from '../usePagination'

interface SortProductListProps {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: SortProductListProps) {
  const navigate = useNavigate()
  const { t } = useTranslation('home')

  const { currPage, nextPage, prevPage } = usePagination(pageSize)

  const { sort_by, order } = queryConfig

  const isActiveSortBy = (sortByValue: Exclude<QueryConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<QueryConfig['sort_by'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<QueryConfig['order'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-black/[0.03] px-5 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='w-full sm:w-auto'>{t('sort_products.sort_by')}</div>
          <button
            className={classNames('h-7 rounded-sm px-4 capitalize leading-7 sm:h-[34px] sm:leading-[34px]', {
              'bg-white text-black transition-all hover:bg-primary hover:text-white': !isActiveSortBy(sortBy.view),
              'bg-primary text-white': isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            {t('sort_products.relevance')}
          </button>
          <button
            className={classNames('h-7 rounded-sm px-4 capitalize leading-7 sm:h-[34px] sm:leading-[34px]', {
              'bg-white text-black transition-all hover:bg-primary hover:text-white': !isActiveSortBy(sortBy.createdAt),
              'bg-primary text-white': isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            {t('sort_products.latest')}
          </button>
          <button
            className={classNames('h-7 rounded-sm px-4 capitalize leading-7 sm:h-[34px] sm:leading-[34px]', {
              'bg-white text-black transition-all hover:bg-primary hover:text-white': !isActiveSortBy(sortBy.sold),
              'bg-primary text-white': isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            {t('sort_products.top_sales')}
          </button>
          <div className='min-w-[10rem] sm:min-w-[12.5rem]'>
            <select
              value={order || ''}
              className={classNames(
                'h-7 w-full rounded-sm border-none bg-white px-4 leading-7 outline-none sm:h-[34px] sm:leading-[34px]',
                {
                  'text-primary': order,
                  'text-black': !order
                }
              )}
              onChange={(e) => handlePriceOrder(e.target.value)}
            >
              <optgroup className='hidden'>
                <option value=''>{t('sort_products.price')}</option>
              </optgroup>
              <option
                value='asc'
                className={classNames('bg-white', {
                  'text-primary': order === 'asc',
                  'text-black': !(order === 'asc')
                })}
              >
                {t('sort_products.price-asc')}
              </option>
              <option
                value='desc'
                className={classNames({
                  'text-primary': order === 'desc',
                  'text-black': !(order === 'desc')
                })}
              >
                {t('sort_products.price-desc')}
              </option>
            </select>
          </div>
        </div>
        <div className='ml-auto flex items-center'>
          <div>
            <span className='text-primary'>{currPage}</span>/<span>{pageSize}</span>
          </div>
          <div className='ml-5'>
            <button
              className={classNames(
                'h-7 w-8 rounded-bl-sm rounded-tl-sm border border-black/10 bg-transparent px-2 shadow-sm transition-all  hover:bg-[#fdfdfd] sm:h-[34px] sm:w-9 sm:px-3',
                {
                  'cursor-not-allowed bg-white opacity-40': currPage === 1
                }
              )}
              disabled={currPage === 1}
              onClick={prevPage}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3.5 w-3.5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>

            <button
              className={classNames(
                'h-7 w-8 rounded-br-sm rounded-tr-sm border border-black/10 bg-transparent px-2 shadow-sm transition-all hover:bg-[#fdfdfd] sm:h-[34px] sm:w-9 sm:px-3',
                {
                  'cursor-not-allowed bg-white opacity-40': currPage === pageSize
                }
              )}
              disabled={currPage === pageSize}
              onClick={nextPage}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3.5 w-3.5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
