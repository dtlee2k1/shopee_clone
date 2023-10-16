import { Navigate, useRoutes } from 'react-router-dom'
import { useApp } from 'src/contexts/app.context'
import CartLayout from 'src/layouts/CartLayout'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import Cart from 'src/pages/Cart'
import Login from 'src/pages/Login'
import ProductDetail from 'src/pages/ProductDetail'
import ProductList from 'src/pages/ProductList'
import Profile from 'src/pages/Profile'
import Register from 'src/pages/Register'

interface ProtectedRouteProps {
  children: React.ReactNode
}

type RejectedRouteProps = ProtectedRouteProps
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useApp()

  return isAuthenticated ? children : <Navigate replace to='/login' />
}

const RejectedRoute = ({ children }: RejectedRouteProps) => {
  const { isAuthenticated } = useApp()

  return !isAuthenticated ? children : <Navigate replace to='/' />
}
export function useRouteElements() {
  const routeElements = useRoutes([
    {
      element: (
        <RejectedRoute>
          <RegisterLayout />
        </RejectedRoute>
      ),
      children: [
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <ProductList />
        },
        {
          path: ':nameId',
          element: (
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          )
        },
        {
          path: 'profile',
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          )
        }
      ]
    },
    {
      element: <CartLayout />,
      children: [
        {
          path: 'cart',
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          )
        }
      ]
    }
  ])
  return routeElements
}
