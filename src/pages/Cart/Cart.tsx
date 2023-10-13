import { useQuery } from '@tanstack/react-query'
import { useApp } from 'src/contexts/app.context'
import { getPurchases } from 'src/apis/purchase.api'
import { purchasesStatus } from 'src/constants/purchase'
import { Link } from 'react-router-dom'
import { formatCurrency, generateNameId } from 'src/utils/helpers'
import QuantityController from 'src/components/QuantityController'

export default function Cart() {
  const { isAuthenticated } = useApp()

  // Get Purchases In Cart List
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })
  const purchasesInCart = purchasesInCartData?.data.data

  return (
    <div className='bg-neutral-100 py-6'>
      <div className='container'>
        <div className='flex flex-col'>
          <div className='overflow-auto'>
            <div className='min-w-[1000px]'>
              <div className='grid grid-cols-12 items-center rounded-sm bg-white px-10 py-4 text-sm text-gray-500 shadow-sm'>
                <div className='col-span-6 flex items-center'>
                  <input
                    type='checkbox'
                    className='mr-5 h-4 w-4 shrink-0 rounded-sm border border-black/[.14] accent-primary shadow-sm'
                  />
                  <div className='flex-grow capitalize text-black/80'>Sản phẩm</div>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-5 text-center'>
                    <div className='col-span-2 capitalize'>Đơn Giá</div>
                    <div className='col-span-1 capitalize'>Số Lượng</div>
                    <div className='col-span-1 capitalize'>Số Tiền</div>
                    <div className='col-span-1 capitalize'>Thao Tác</div>
                  </div>
                </div>
              </div>
              <div className='mt-3 divide-y rounded-sm border-b border-t bg-white py-3 shadow-sm'>
                {purchasesInCart?.map((purchase) => (
                  <div
                    key={purchase._id}
                    className='grid grid-cols-12 items-center overflow-hidden rounded-sm bg-white px-10 py-4 text-sm text-gray-500'
                  >
                    <div className='col-span-6 flex items-center'>
                      <input
                        type='checkbox'
                        className='mr-5 h-4 w-4 shrink-0 rounded-sm border border-black/[.14] accent-primary shadow-sm'
                      />
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link
                            to={`/${generateNameId(purchase.product.name, purchase.product._id)}`}
                            className='h-20 w-20 shrink-0'
                          >
                            <img
                              src={purchase.product.image}
                              alt={purchase.product.name}
                              className='h-full w-full bg-cover'
                            />
                          </Link>
                          <div className='flex flex-grow px-2.5 pt-1.5'>
                            <Link
                              to={`/${generateNameId(purchase.product.name, purchase.product._id)}`}
                              className='line-clamp-2 max-h-10 '
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid grid-cols-5 items-center text-center'>
                        <div className='col-span-2'>
                          <div className='flex items-center justify-center gap-2.5'>
                            <span className='text-gray-500 line-through'>
                              ₫{formatCurrency(purchase.price_before_discount)}
                            </span>
                            <span className='text-black/90'>₫{formatCurrency(purchase.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <QuantityController
                            max={purchase.product.quantity}
                            value={purchase.buy_count}
                            classNameWrapper='flex items-center justify-center'
                          />
                        </div>
                        <div className='col-span-1'>
                          <span className='text-primary'>₫{formatCurrency(purchase.price * purchase.buy_count)}</span>
                        </div>
                        <div className='col-span-1'>
                          <button className='border-none bg-none transition-colors hover:text-primary'>Xóa</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='z-[2] mt-8 flex flex-col rounded-sm border-t bg-white px-10 py-5 shadow-md sm:sticky sm:bottom-0 sm:flex-row sm:items-center'>
            <div className='flex items-center gap-4 px-4'>
              <div className='flex shrink-0 items-center justify-center'>
                <input
                  type='checkbox'
                  className='mr-1 h-4 w-4 shrink-0 rounded-sm border border-black/[.14] accent-primary shadow-sm'
                />
              </div>
              <button className='border-none bg-none capitalize'>Chọn tất cả (2)</button>
              <button className='border-none bg-none capitalize'>Xóa</button>
            </div>
            <div className='mt-4 flex flex-col sm:ml-auto sm:mt-0 sm:items-center lg:flex-row'>
              <div className='flex flex-col'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end'>
                  <div className='whitespace-nowrap'>Tổng thanh toán (2 sản phẩm):</div>
                  <div className='mt-2 self-center text-2xl text-primary sm:ml-1.5 sm:mt-0'>
                    ₫{formatCurrency(137000)}
                  </div>
                </div>
                <div className='mt-[1px] flex items-center justify-center text-sm sm:justify-end '>
                  Tiết kiệm <span className='pl-3 text-primary sm:pl-6'>₫{formatCurrency(93000)}</span>
                </div>
              </div>
              <button className='mt-4 h-10 w-full rounded-sm bg-primary px-4 text-sm font-light capitalize text-white outline-none transition-opacity hover:opacity-90 lg:ml-4 lg:mt-0 lg:w-52'>
                Mua hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
