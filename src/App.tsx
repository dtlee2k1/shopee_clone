import { useRouteElements } from './hooks/useRouteElements'

export function App() {
  const routeElements = useRouteElements()
  return <div>{routeElements}</div>
}

export default App
