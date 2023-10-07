import { forwardRef } from 'react'

import classNames from 'classnames'
import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    type,
    placeholder,
    classNameInput = 'w-full rounded border p-3 text-sm outline-none focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1rem] text-xs text-red-600',
    className,
    errorMessage,
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (onChange && (/^\d+$/.test(value) || value === '')) onChange(e)
  }

  return (
    <div className={className}>
      <input
        type={type}
        className={classNames(classNameInput, {
          'border-red-600 bg-red-50 focus:border-red-600': errorMessage,
          'border-gray-300 focus:border-gray-500': !errorMessage
        })}
        placeholder={placeholder}
        onChange={handleChange}
        {...rest}
        ref={ref}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
