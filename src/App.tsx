import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouteElements } from './hooks/useRouteElements'

function App() {
  // All route of this application
  const routeElements = useRouteElements()

  return (
    <>
      {routeElements}
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        limit={3}
      />
    </>
  )
}

export default App
