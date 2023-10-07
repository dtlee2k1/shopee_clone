import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import SortProductList from './components/SortProductList'

import Pagination from 'src/components/Pagination'
import { useProducts } from './components/useProducts'
import { useCategories } from './components/useCategories'

export default function ProductList() {
  const { productsData, queryConfig } = useProducts()
  const { categoriesData } = useCategories()

  return (
    <div className='bg-neutral-100 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-5'>
          <div className='col-span-2'>
            <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
          </div>
          {productsData && (
            <div className='col-span-10'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-2.5 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product) => (
                  <div key={product._id} className='col-span-1'>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination pageSize={productsData.data.data.pagination.page_size} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
