import { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface QuantityControllerProps extends InputNumberProps {
  max?: number
  value?: number
  classNameWrapper?: string
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onVary?: (value: number) => void
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onVary,
  value = 1,
  classNameWrapper = 'flex items-center mr-4',
  ...rest
}: QuantityControllerProps) {
  const [localValue, setLocalValue] = useState<number>(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) _value = max
    else if (_value < 1) _value = 1

    onVary && onVary(_value)
    setLocalValue(_value)
  }

  const increase = () => {
    let _value = Number(localValue) + 1
    if (max !== undefined && _value > max) _value = max
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const decrease = () => {
    let _value = Number(localValue) - 1
    if (_value < 1) _value = 1

    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  return (
    <div className={classNameWrapper}>
      <button
        className='h-8 w-8 rounded-l-sm border border-black/10 bg-transparent text-black/80 outline-none'
        onClick={decrease}
      >
        &minus;
      </button>

      <InputNumber
        type='text'
        value={localValue}
        classNameInput='h-8 w-14 border border-x-0 border-black/10 bg-transparent text-center'
        classNameError='hidden'
        onChange={handleChange}
        {...rest}
      />

      <button
        className='h-8 w-8 rounded-r-sm border border-black/10 bg-transparent text-black/80 outline-none'
        onClick={increase}
      >
        &#43;
      </button>
    </div>
  )
}
