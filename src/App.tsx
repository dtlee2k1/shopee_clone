import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouteElements } from './hooks/useRouteElements'
import { localStorageEvent } from './utils/auth'
import { useApp } from './contexts/app.context'

function App() {
  const { reset } = useApp()
  // All route of this application
  const routeElements = useRouteElements()

  // When the `access token` is invalid, the LocalStorage is cleared (all storage object items stored in LS are removed) then a new event `clearLS` is dispatched from `localStorageEvent` for the purpose of resetting all the state in the `App Context`
  useEffect(() => {
    localStorageEvent.addEventListener('clearLS', reset)
    return () => {
      localStorageEvent.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <>
      {routeElements}
      <ToastContainer
        position='top-center'
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
        bodyClassName={() => 'text-sm flex p-2 items-center'}
      />
    </>
  )
}

export default App
