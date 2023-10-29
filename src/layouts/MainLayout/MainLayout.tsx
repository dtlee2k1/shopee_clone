import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

export default function MainLayout() {
  return (
    <div className='flex flex-col bg-white'>
      <Header />
      <div className='min-h-[480px] bg-neutral-100'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
