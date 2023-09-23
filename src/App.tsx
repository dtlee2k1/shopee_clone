import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <BrowserRouter>
      <div className='flex h-screen items-center justify-center'>
        <div className='w-48 bg-slate-400 text-red-300'>App</div>
      </div>
    </BrowserRouter>
  )
}

export default App
