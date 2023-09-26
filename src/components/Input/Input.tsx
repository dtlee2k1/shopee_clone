import classNames from 'classnames'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: 'on' | 'off'
}

export default function Input({ type, name, placeholder, register, className, errorMessage, rules }: InputProps) {
  return (
    <div className={className}>
      <input
        type={type}
        className={classNames('w-full rounded border p-3 text-sm outline-none focus:shadow-sm', {
          'border-red-600 bg-red-50 focus:border-red-600': errorMessage,
          'border-gray-300 focus:border-gray-500': !errorMessage
        })}
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <div className='mt-1 min-h-[1rem] text-xs text-red-600'>{errorMessage}</div>
    </div>
  )
}
