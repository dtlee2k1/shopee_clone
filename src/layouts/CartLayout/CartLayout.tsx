import { Outlet } from 'react-router-dom'
import CartHeader from 'src/components/CartHeader'
import Footer from 'src/components/Footer'

export default function CartLayout() {
  return (
    <div className='flex flex-col bg-white'>
      <CartHeader />
      <div className='min-h-[480px] bg-neutral-100'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
