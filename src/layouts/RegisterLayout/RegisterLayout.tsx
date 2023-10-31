import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

function RegisterLayoutInner() {
  return (
    <div className='flex flex-col bg-white '>
      <RegisterHeader />
      <Outlet />
      <Footer />
    </div>
  )
}

const RegisterLayout = memo(RegisterLayoutInner)

export default RegisterLayout
