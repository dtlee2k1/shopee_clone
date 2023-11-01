import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useQueryConfig from 'src/hooks/useQueryConfig'

interface Props {
  children: React.ReactNode
}

const ScrollToTop = ({ children }: Props) => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation()
  const queryConfig = useQueryConfig()

  const { page } = queryConfig

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, page])

  return children
}

export default ScrollToTop
