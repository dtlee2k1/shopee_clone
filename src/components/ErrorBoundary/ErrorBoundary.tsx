import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error: ', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className='flex h-screen w-full flex-col items-center justify-center bg-white'>
          <h1 className='text-9xl font-extrabold tracking-widest text-black/70'>500</h1>
          <div className='absolute rotate-12 rounded bg-primary px-2 text-sm text-white shadow-sm'>
            Internal Server Error
          </div>
          <button className='mt-5'>
            <a
              href='/'
              className='group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring active:text-orange-500'
            >
              <span className='absolute inset-0 translate-x-0.5 translate-y-0.5 rounded-sm bg-primary transition-transform group-hover:translate-x-0 group-hover:translate-y-0' />
              <span className='relative block rounded-sm border border-current bg-primary px-8 py-3 '>
                Trở về trang chủ
              </span>
            </a>
          </button>
        </main>
      )
    }

    return this.props.children
  }
}
