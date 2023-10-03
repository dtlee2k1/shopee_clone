import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'

import Pagination from 'src/components/Pagination'
import { useProductList } from './useProductList'

export default function ProductList() {
  const { data } = useProductList()

  return (
    <div className='bg-neutral-100 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-5'>
          <div className='col-span-2'>
            <AsideFilter />
          </div>
          {data && (
            <div className='col-span-10'>
              <SortProductList />
              <div className='mt-2.5 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {data.data.data.products.map((product) => (
                  <div key={product._id} className='col-span-1'>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination pageSize={data.data.data.pagination.page_size} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
