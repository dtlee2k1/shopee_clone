import classNames from 'classnames'
import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  type,
  name,
  placeholder,
  register,
  classNameInput = 'w-full rounded border p-3 text-sm outline-none focus:shadow-sm',
  classNameError = 'mt-1 min-h-[1rem] text-xs text-red-600',
  className,
  errorMessage
}: InputProps) {
  const registerResult = register && name ? register(name) : {}

  return (
    <div className={className}>
      <input
        type={type}
        className={classNames(classNameInput, {
          'border-red-600 bg-red-50 focus:border-red-600': errorMessage,
          'border-gray-300 focus:border-gray-500': !errorMessage
        })}
        placeholder={placeholder}
        {...registerResult}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
