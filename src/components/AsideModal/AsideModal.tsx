import { useState, createContext, useContext, cloneElement, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface AsideModalProps {
  children: React.ReactNode
}

interface OpenProps {
  children: JSX.Element
  opens: string
}

interface WindowProps {
  children: JSX.Element
  name: string
}

interface AsideModalContextType {
  openName: string
  open: (value: string) => void
  close: () => void
}

const AsideModalContext = createContext<AsideModalContextType | null>(null)

function AsideModal({ children }: AsideModalProps) {
  const [openName, setOpenName] = useState<string>('')

  const open = (value: string) => setOpenName(value)
  const close = () => setOpenName('')

  return <AsideModalContext.Provider value={{ openName, open, close }}>{children}</AsideModalContext.Provider>
}

function Open({ opens: opensWindowName, children }: OpenProps) {
  const { open } = useContext(AsideModalContext) as AsideModalContextType
  // Set openName value for the modal
  return cloneElement(children, {
    onClick: () => open(opensWindowName)
  })
}

function Window({ children, name }: WindowProps) {
  const { openName, close } = useContext(AsideModalContext) as AsideModalContextType
  const isOpen = Boolean(name === openName)

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close()
      }
    }
    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [close])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, translateX: -100 + '%' }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ translateX: -100 + '%' }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          className='fixed inset-0 z-50 backdrop-blur-sm  lg:hidden'
        >
          <div
            className='fixed bottom-0 left-0 top-0 w-[65%] max-w-[calc(100%-16px)] rounded-sm bg-white/95 px-6 py-4 text-xs shadow-md lg:hidden'
            ref={ref}
          >
            <div className='h-screen  max-w-[400px]'>{cloneElement(children, { onCloseModal: close })}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

AsideModal.Open = Open
AsideModal.Window = Window

export default AsideModal
