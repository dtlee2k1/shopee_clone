import { useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'
import useQueryParams from 'src/hooks/useQueryParams'
import { getProducts } from 'src/apis/product.api'

export default function ProductList() {
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => getProducts(queryParams)
  })

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
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className='col-span-1'>
                  <Product />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
