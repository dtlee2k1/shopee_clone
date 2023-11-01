import { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface QuantityControllerProps extends InputNumberProps {
  max?: number
  value?: number
  classNameWrapper?: string
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onVary?: (value: number) => void
  onFocusOut?: (value: number) => void
}

export default function QuantityController({
  max,
  value,
  classNameWrapper = 'flex items-center mr-4',
  disabled,
  onIncrease,
  onDecrease,
  onVary,
  onFocusOut,
  ...rest
}: QuantityControllerProps) {
  const [localValue, setLocalValue] = useState<number>(value || 1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) _value = max
    else if (_value < 1) _value = 1

    onVary && onVary(_value)
    setLocalValue(_value)
  }

  const handleBlur = () => {
    const _value = Number(value || localValue)

    onFocusOut && onFocusOut(_value)
  }

  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) _value = max
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const decrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) _value = 1

    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  return (
    <div className={classNameWrapper}>
      <button
        className='h-6 w-6 rounded-l-sm border border-black/10 bg-transparent text-black/80 outline-none disabled:opacity-60 sm:h-8  sm:w-8'
        disabled={disabled}
        onClick={decrease}
      >
        &minus;
      </button>

      <InputNumber
        type='text'
        value={value || localValue}
        classNameInput='h-6 w-12 border border-x-0 border-black/10 bg-transparent text-center disabled:opacity-60 sm:h-8 sm:w-14'
        classNameError='hidden'
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        {...rest}
      />

      <button
        className='h-6 w-6 rounded-r-sm border border-black/10 bg-transparent text-black/80 outline-none disabled:opacity-60 sm:h-8 sm:w-8'
        disabled={disabled}
        onClick={increase}
      >
        &#43;
      </button>
    </div>
  )
}
