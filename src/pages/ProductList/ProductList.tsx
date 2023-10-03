import { useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'
import useQueryParams from 'src/hooks/useQueryParams'
import { getProducts } from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import { useState } from 'react'

export default function ProductList() {
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => getProducts(queryParams)
  })

  const [page, setPage] = useState(1)

  return (
    <div className='bg-neutral-100 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-5'>
          <div className='col-span-2'>
            <AsideFilter />
          </div>
          <div className='col-span-10'>
            <SortProductList />
            <div className='mt-2.5 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {data &&
                data.data.data.products.map((product) => (
                  <div key={product._id} className='col-span-1'>
                    <Product product={product} />
                  </div>
                ))}
            </div>
            <Pagination currPage={page} setPage={setPage} pageSize={1} />
          </div>
        </div>
      </div>
    </div>
  )
}
