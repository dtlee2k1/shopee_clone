import { useRouteElements } from './hooks/useRouteElements'

export function App() {
  // All route of this application
  const routeElements = useRouteElements()

  return <div>{routeElements}</div>
}

export default App
