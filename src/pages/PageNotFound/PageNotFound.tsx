import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <main className='flex h-screen w-full flex-col items-center justify-center bg-white'>
      <Helmet>
        <title>Page Not Found | Shopee Clone</title>
        <meta name='description' content='It looks like something is missing!' />
      </Helmet>
      <h1 className='text-9xl font-extrabold tracking-widest text-black/70'>404</h1>
      <div className='absolute rotate-12 rounded bg-primary px-2 text-sm text-white shadow-sm'>Page Not Found</div>
      <button className='mt-5'>
        <Link
          to='/'
          className='group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring active:text-orange-500'
        >
          <span className='absolute inset-0 translate-x-0.5 translate-y-0.5 rounded-sm bg-primary transition-transform group-hover:translate-x-0 group-hover:translate-y-0' />
          <span className='relative block rounded-sm border border-current bg-primary px-8 py-3 '>
            Trở về trang chủ
          </span>
        </Link>
      </button>
    </main>
  )
}
