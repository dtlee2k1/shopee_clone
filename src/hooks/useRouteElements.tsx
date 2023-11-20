import { lazy, Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Loader from 'src/components/Loader'
import ScrollToTop from 'src/components/ScrollToTop'
import { useApp } from 'src/contexts/app.context'
import CartLayout from 'src/layouts/CartLayout'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import UserLayout from 'src/pages/User/layouts/UserLayout'

const Login = lazy(() => import('src/pages/Login'))
const Register = lazy(() => import('src/pages/Register'))
const ProductList = lazy(() => import('src/pages/ProductList'))
const ProductDetail = lazy(() => import('src/pages/ProductDetail'))
const Cart = lazy(() => import('src/pages/Cart'))
const Profile = lazy(() => import('src/pages/User/pages/Profile'))
const ChangePassword = lazy(() => import('src/pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('src/pages/User/pages/HistoryPurchase'))
const PageNotFound = lazy(() => import('src/pages/PageNotFound'))

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
          element: (
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          )
        },
        {
          path: 'register',
          element: (
            <Suspense fallback={<Loader />}>
              <Register />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense>
              <ScrollToTop>
                <ProductList />
              </ScrollToTop>
            </Suspense>
          )
        },
        {
          path: ':nameId',
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <ScrollToTop>
                  <ProductDetail />
                </ScrollToTop>
              </Suspense>
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
                  element: (
                    <Suspense fallback={<Loader />}>
                      <Profile />
                    </Suspense>
                  )
                },
                {
                  path: 'password',
                  element: (
                    <Suspense fallback={<Loader />}>
                      <ChangePassword />
                    </Suspense>
                  )
                }
              ]
            },
            {
              path: 'purchase',
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
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
              <Suspense fallback={<Loader />}>
                <Cart />
              </Suspense>
            </ProtectedRoute>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <Suspense>
          <PageNotFound />
        </Suspense>
      )
    }
  ])
  return routeElements
}
