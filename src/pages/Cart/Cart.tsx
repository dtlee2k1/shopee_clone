import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { buyPurchases, deletePurchases, getPurchases, updatePurchase } from 'src/apis/purchase.api'
import { formatCurrency, generateNameId } from 'src/utils/helpers'
import { purchasesStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import QuantityController from 'src/components/QuantityController'
import EmptyCart from './components/EmptyCart'
import Modal from 'src/components/Modal'
import ConfirmDelete from 'src/components/ConfirmDelete'

interface ExtendedPurchases extends Purchase {
  checked: boolean
  disabled: boolean
}

export default function Cart() {
  const queryClient = useQueryClient()
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>([])
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)
  const checkedPurchases = extendedPurchases.filter((purchase) => purchase.checked)
  const checkedCount = checkedPurchases.length

  const totalPaid = checkedPurchases.reduce((total, purchase) => total + purchase.price * purchase.buy_count, 0)

  const totalSavings = checkedPurchases.reduce(
    (total, purchase) => total + (purchase.price_before_discount - purchase.price) * purchase.buy_count,
    0
  )

  // Get Purchases In Cart List Query
  const { data: purchasesInCartData, isLoading: isLoading1 } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => getPurchases({ status: purchasesStatus.inCart })
  })

  const purchasesInCart = purchasesInCartData?.data.data

  // Update QUANTITY of purchase Mutation
  const { mutate: quantityMutate, isLoading: isLoading2 } = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => updatePurchase(body),
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases'])
    }
  })

  // BUY Products Mutation
  const { mutate: buyProductsMutate, isLoading: isBuying } = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }[]) => buyPurchases(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['purchases'])
      toast.success(data.data.message)
    }
  })

  // DELETE Purchases Mutation
  const { mutate: deleteMutate } = useMutation({
    mutationFn: deletePurchases,
    onSuccess: () => {
      queryClient.invalidateQueries(['purchases'])
    }
  })

  // side effects to generate new objects of purchases with 2 keys `checked` & `disabled`
  useEffect(() => {
    setExtendedPurchases((extendedPurchases) => {
      return (
        purchasesInCart?.map((purchase) => ({
          ...purchase,
          checked: Boolean(
            extendedPurchases.find((extendedPurchase) => extendedPurchase._id === purchase._id)?.checked
          ),
          disabled: false
        })) || []
      )
    })
  }, [purchasesInCart])

  const handleToggleChecked = (purchaseIndex: number) => {
    setExtendedPurchases((purchases) =>
      purchases.map((purchase, index) =>
        index === purchaseIndex ? { ...purchase, checked: !purchase.checked } : purchase
      )
    )
  }

  const handleToggleCheckedAll = () => {
    setExtendedPurchases((purchases) => purchases.map((purchase) => ({ ...purchase, checked: !isAllChecked })))
  }

  // set value for `InputNumber` in `QuantityController` component
  const handleChangeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases((purchases) =>
      purchases.map((purchase, index) => (index === purchaseIndex ? { ...purchase, buy_count: value } : purchase))
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases((purchases) =>
        purchases.map((purchase, index) => (index === purchaseIndex ? { ...purchase, disabled: true } : purchase))
      )

      quantityMutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleDeleteAPurchase = (purchaseId: string) => {
    deleteMutate([purchaseId])
  }

  const handleDeletePurchases = () => {
    const purchasesIds = checkedPurchases.map((purchase) => purchase._id)
    if (checkedCount > 0) deleteMutate(purchasesIds)
  }

  const handleBuyProducts = () => {
    const body = checkedPurchases.map((purchase) => ({
      product_id: purchase.product._id,
      buy_count: purchase.buy_count
    }))
    if (checkedCount > 0) buyProductsMutate(body)
    else toast.warn('Bạn vẫn chưa chọn sản phẩm nào để mua')
  }

  if (isLoading1 && isLoading2) return null

  return (
    <div className='bg-neutral-100 py-6'>
      <div className='container'>
        {purchasesInCart?.length === 0 && <EmptyCart />}
        {purchasesInCart && purchasesInCart.length > 0 && (
          <div className='flex flex-col'>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 items-center rounded-sm bg-white px-10 py-4 text-sm text-gray-500 shadow-sm'>
                  <div className='col-span-6 flex items-center'>
                    <input
                      type='checkbox'
                      className='mr-5 h-4 w-4 shrink-0 rounded-sm border border-black/[.14] accent-primary shadow-sm'
                      checked={isAllChecked}
                      onChange={handleToggleCheckedAll}
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
                  {extendedPurchases?.map((purchase, index) => (
                    <div
                      key={purchase._id}
                      className='grid grid-cols-12 items-center overflow-hidden rounded-sm bg-white px-10 py-4 text-sm text-gray-500'
                    >
                      <div className='col-span-6 flex items-center'>
                        <input
                          type='checkbox'
                          className='mr-5 h-4 w-4 shrink-0 rounded-sm border border-black/[.14] accent-primary shadow-sm'
                          checked={purchase.checked}
                          onChange={() => handleToggleChecked(index)}
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
                              onIncrease={(value) =>
                                handleQuantity(index, value, purchase.buy_count < purchase.product.quantity)
                              }
                              onDecrease={(value) => handleQuantity(index, value, purchase.buy_count > 1)}
                              onVary={handleChangeQuantity(index)}
                              onFocusOut={(value) =>
                                handleQuantity(index, value, value !== (purchasesInCart as Purchase[])[index].buy_count)
                              }
                              disabled={purchase.disabled}
                            />
                          </div>
                          <div className='col-span-1'>
                            <span className='text-primary'>₫{formatCurrency(purchase.price * purchase.buy_count)}</span>
                          </div>
                          <div className='col-span-1'>
                            <button
                              className='border-none bg-none transition-colors hover:text-primary'
                              onClick={() => handleDeleteAPurchase(purchase._id)}
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='z-[2] mt-8 flex flex-col rounded-sm border-t bg-white px-10 py-5 shadow-md sm:sticky sm:bottom-0 sm:flex-row sm:items-center'>
              <div className='flex items-center gap-4 pr-4'>
                <div className='flex shrink-0 items-center justify-center'>
                  <input
                    type='checkbox'
                    className='mr-1 h-4 w-4 shrink-0 rounded-sm border border-black/[.14] accent-primary shadow-sm'
                    checked={isAllChecked}
                    onChange={handleToggleCheckedAll}
                  />
                </div>
                <button className='border-none bg-none capitalize' onClick={handleToggleCheckedAll}>
                  Chọn tất cả ({extendedPurchases.length})
                </button>
                <Modal>
                  <Modal.Open opens='delete' enable={checkedCount > 0}>
                    <button className='border-none bg-none capitalize'>Xóa</button>
                  </Modal.Open>
                  <Modal.Window name='delete'>
                    <ConfirmDelete onConfirm={handleDeletePurchases} quantity={checkedCount} />
                  </Modal.Window>
                </Modal>
              </div>
              <div className='mt-4 flex flex-col sm:ml-auto sm:mt-0 sm:items-center lg:flex-row'>
                <div className='flex flex-col'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end'>
                    <div className='whitespace-nowrap'>Tổng thanh toán ({checkedCount} sản phẩm):</div>
                    <div className='mt-2 self-center text-2xl text-primary sm:ml-1.5 sm:mt-0'>
                      ₫{formatCurrency(totalPaid)}
                    </div>
                  </div>
                  {totalSavings > 0 && (
                    <div className='mt-[1px] flex items-center justify-center text-sm sm:justify-end '>
                      Tiết kiệm
                      <span className='pl-3 text-primary sm:pl-6'>₫{formatCurrency(totalSavings)}</span>
                    </div>
                  )}
                </div>
                <button
                  className='mt-4 h-10 w-full rounded-sm bg-primary px-4 text-sm font-light capitalize text-white outline-none transition-opacity hover:opacity-90 lg:ml-4 lg:mt-0 lg:w-52'
                  onClick={handleBuyProducts}
                  disabled={isBuying}
                >
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
