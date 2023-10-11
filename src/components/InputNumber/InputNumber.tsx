import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import classNames from 'classnames'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
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
    value = '',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (/^\d+$/.test(value) || value === '') {
      onChange && onChange(e)
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input
        type={type}
        value={value || localValue}
        className={classNames(classNameInput, {
          'border-red-600 bg-red-50 focus:border-red-600': errorMessage,
          'border-gray-300 focus:border-gray-500': !errorMessage
        })}
        placeholder={placeholder}
        onChange={handleChange}
        ref={ref}
        {...rest}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
