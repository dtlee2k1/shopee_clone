import { Navigate, useRoutes } from 'react-router-dom'
import { useApp } from 'src/contexts/app.context'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
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
          path: ':id',
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
    }
  ])
  return routeElements
}
