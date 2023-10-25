import { Navigate, useRoutes } from 'react-router-dom'
import { useApp } from 'src/contexts/app.context'
import CartLayout from 'src/layouts/CartLayout'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import Cart from 'src/pages/Cart'
import Login from 'src/pages/Login'
import PageNotFound from 'src/pages/PageNotFound'
import ProductDetail from 'src/pages/ProductDetail'
import ProductList from 'src/pages/ProductList'
import Register from 'src/pages/Register'
import UserLayout from 'src/pages/User/layouts/UserLayout'
import ChangePassword from 'src/pages/User/pages/ChangePassword'
import HistoryPurchase from 'src/pages/User/pages/HistoryPurchase'
import Profile from 'src/pages/User/pages/Profile'

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
          path: 'user',
          element: (
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <Navigate to='account' />
            },
            {
              path: 'account',
              children: [
                {
                  index: true,
                  element: <Navigate to='profile' />
                },
                {
                  path: 'profile',
                  element: <Profile />
                },
                {
                  path: 'password',
                  element: <ChangePassword />
                }
              ]
            },
            {
              path: 'purchase',
              element: <HistoryPurchase />
            }
          ]
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
    },
    {
      path: '*',
      element: <PageNotFound />
    }
  ])
  return routeElements
}
