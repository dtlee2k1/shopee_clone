import classNames from 'classnames'
import { usePagination } from 'src/pages/ProductList/usePagination'

interface PaginationProps {
  pageSize: number
}

const RANGE = 2

export default function Pagination({ pageSize }: PaginationProps) {
  const { currPage, nextPage, prevPage, searchParams, setSearchParams } = usePagination(pageSize)

  const targetPage = (pageNum: number) => {
    searchParams.set('page', String(pageNum))
    setSearchParams(searchParams)
  }

  const renderPagination = () => {
    let dotsAfter = false
    let dotsBefore = false

    const renderDotsAfter = (index: number) => {
      if (!dotsAfter) {
        dotsAfter = true
        return (
          <button
            key={index}
            className='h-[30px] min-w-[40px] cursor-default rounded-sm text-xl text-black/40 hover:text-primary'
          >
            ...
          </button>
        )
      }
      return null
    }

    const renderDotsBefore = (index: number) => {
      if (!dotsBefore) {
        dotsBefore = true
        return (
          <button
            key={index}
            className='h-[30px] min-w-[40px] cursor-default rounded-sm text-xl text-black/40 hover:text-primary'
          >
            ...
          </button>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNum = index + 1
        const isActive = pageNum === currPage
        //condition to render `...`
        if (currPage <= 2 * RANGE + 1 && pageNum > currPage + RANGE && pageNum < pageSize - RANGE + 1) {
          return renderDotsAfter(index)
        } else if (currPage > 2 * RANGE + 1 && currPage < pageSize - RANGE * 2) {
          if (pageNum < currPage - RANGE && pageNum > RANGE) {
            return renderDotsBefore(index)
          } else if (pageNum > currPage + RANGE && pageNum < pageSize - RANGE + 1) {
            return renderDotsAfter(index)
          }
        } else if (currPage >= pageSize - RANGE * 2 && pageNum < currPage - RANGE && pageNum > RANGE) {
          return renderDotsBefore(index)
        }

        return (
          <button
            key={index}
            className={classNames('h-[30px] min-w-[40px] rounded-sm text-xl ', {
              'bg-primary text-white': isActive,
              'text-black/40 hover:text-primary': !isActive
            })}
            onClick={() => targetPage(pageNum)}
          >
            {pageNum}
          </button>
        )
      })
  }

  return (
    <div className='m-10 flex flex-wrap justify-center gap-[30px] '>
      <button
        className={classNames('text-black/40', {
          'cursor-not-allowed': currPage === 1
        })}
        onClick={prevPage}
        disabled={currPage === 1}
      >
        <svg enableBackground='new 0 0 11 11' viewBox='0 0 11 11' x={0} y={0} className='h-3.5 w-3.5 fill-current'>
          <g>
            <path d='m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z' />
          </g>
        </svg>
      </button>
      {renderPagination()}
      <button
        className={classNames('text-black/40', {
          'cursor-not-allowed': currPage === pageSize
        })}
        onClick={nextPage}
        disabled={currPage === pageSize}
      >
        <svg enableBackground='new 0 0 11 11' viewBox='0 0 11 11' x={0} y={0} className='h-3.5 w-3.5 fill-current'>
          <path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z' />
        </svg>
      </button>
    </div>
  )
}
