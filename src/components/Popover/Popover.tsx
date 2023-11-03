import {
  FloatingPortal,
  MiddlewareData,
  Placement,
  Strategy,
  arrow,
  offset,
  shift,
  useFloating
} from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { createContext, useContext, useState, useRef } from 'react'

interface PopoverContextType {
  isOpen: boolean
  refs: any
  arrowRef: React.RefObject<HTMLElement>
  x: number
  y: number
  strategy: Strategy
  middlewareData: MiddlewareData
  showPopover: () => void
  hidePopover: () => void
  togglePopover: () => void
}
const PopoverContext = createContext<PopoverContextType | null>(null)

interface PopoverProps {
  children: React.ReactNode
  placement?: Placement
  initialOpen?: boolean
}

interface ContainerProps {
  children: React.ReactNode
}

interface HeadingProps {
  children: React.ReactNode
  className?: string
}

interface ContentProps {
  children: React.ReactNode
}

export function Popover({ children, placement = 'bottom-end', initialOpen = false }: PopoverProps) {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen)
  const arrowRef = useRef<HTMLElement>(null)
  const { refs, x, y, strategy, middlewareData } = useFloating({
    open: isOpen,
    placement: placement,
    onOpenChange: setIsOpen,
    middleware: [
      offset({
        crossAxis: -20,
        mainAxis: 3
      }),
      shift(),
      arrow({ element: arrowRef })
    ]
  })

  const showPopover = () => {
    setIsOpen(true)
  }

  const hidePopover = () => {
    setIsOpen(false)
  }

  const togglePopover = () => {
    setIsOpen(!isOpen)
  }

  return (
    <PopoverContext.Provider
      value={{ isOpen, refs, arrowRef, x, y, strategy, middlewareData, showPopover, hidePopover, togglePopover }}
    >
      {children}
    </PopoverContext.Provider>
  )
}

function Container({ children }: ContainerProps) {
  const { refs, showPopover, hidePopover, togglePopover } = useContext(PopoverContext) as PopoverContextType
  return (
    <div
      ref={refs.setReference}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
      onClick={togglePopover}
      onKeyDown={togglePopover}
      role='button'
      tabIndex={0}
    >
      {children}
    </div>
  )
}

function Heading({
  children,
  className = 'flex cursor-pointer items-center sm:px-2.5 py-1 hover:text-white/70'
}: HeadingProps) {
  return <div className={className}>{children}</div>
}

function Content({ children }: ContentProps) {
  const { isOpen, refs, x, y, strategy, middlewareData, arrowRef } = useContext(PopoverContext) as PopoverContextType
  return (
    <AnimatePresence>
      {isOpen && (
        <FloatingPortal>
          <motion.div
            ref={refs.setFloating}
            style={{
              position: strategy,
              left: x ?? 0,
              top: y ?? 0,
              width: 'max-content',
              transformOrigin: 'top right'
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            className='z-50'
          >
            <span
              ref={arrowRef}
              className='absolute z-10 translate-x-4 translate-y-[-70%] border-x-[14px] border-b-[10px] border-x-transparent border-b-white border-t-transparent sm:translate-x-0'
              style={{ left: middlewareData.arrow?.x, top: middlewareData.arrow?.y }}
            ></span>
            {children}
          </motion.div>
        </FloatingPortal>
      )}
    </AnimatePresence>
  )
}

Popover.Container = Container
Popover.Heading = Heading
Popover.Content = Content

export default Popover
