import { ButtonHTMLAttributes } from 'react'
import Spinner from '../Spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean
}
export default function Button(props: ButtonProps) {
  const { isLoading, type, disabled, className, children, onClick, ...rest } = props

  const newClassName = isLoading ? className + ' cursor-not-allowed bg-primary/90' : className

  return (
    <button type={type} className={newClassName} disabled={disabled} onClick={onClick}>
      {isLoading && <Spinner />}
      {children}
    </button>
  )
}
