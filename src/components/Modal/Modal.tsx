import { useState, createContext, useContext, cloneElement, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { toast } from 'react-toastify'

interface ModalProps {
  children: React.ReactNode
}

interface OpenProps {
  children: JSX.Element
  opens: string
  enable: boolean
}

interface WindowProps {
  children: JSX.Element
  name: string
}

interface ModalContextType {
  openName: string
  open: (value: string) => void
  close: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>('')

  const open = (value: string) => setOpenName(value)
  const close = () => setOpenName('')

  return <ModalContext.Provider value={{ openName, open, close }}>{children}</ModalContext.Provider>
}

function Open({ opens: opensWindowName, enable, children }: OpenProps) {
  const { open } = useContext(ModalContext) as ModalContextType
  // Set openName value for the modal
  return cloneElement(children, {
    onClick: () => {
      if (enable) open(opensWindowName)
      else toast.warn('Vui lòng chọn sản phẩm')
    }
  })
}

function Window({ children, name }: WindowProps) {
  const { openName, close } = useContext(ModalContext) as ModalContextType
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

  if (name !== openName) return

  return createPortal(
    <div className='fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-all duration-500'>
      <div
        className='fixed left-1/2 top-1/2 w-[440px] max-w-[calc(100%-16px)] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white px-10 pb-6 pt-11 text-base shadow-md'
        ref={ref}
      >
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body
  )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
