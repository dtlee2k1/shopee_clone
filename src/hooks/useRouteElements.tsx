import { useRoutes } from 'react-router-dom'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import Login from 'src/pages/Login'
import ProductList from 'src/pages/ProductList'
import Register from 'src/pages/Register'

export function useRouteElements() {
  const routeElements = useRoutes([
    {
      element: <RegisterLayout />,
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
        }
      ]
    }
  ])
  return routeElements
}
