import { useState, useEffect } from 'react'
import range from 'lodash/range'

interface DateSelectProps {
  classNameError?: string
  errorMessage?: string
  value?: Date
  onChange?: (value: Date) => void
}

export default function DateSelect({
  classNameError = 'mt-1 min-h-[1rem] text-xs text-red-600',
  errorMessage,
  value,
  onChange
}: DateSelectProps) {
  const [date, setDate] = useState({
    day: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        day: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const newDate = { ...date, [name]: value }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.day))
  }

  return (
    <div className='mt-2 sm:mt-0 sm:w-[80%] sm:pl-5'>
      <div className='flex justify-between'>
        <select
          name='day'
          value={value?.getDate() || date.day}
          onChange={handleChangeDate}
          className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-4  text-sm  outline-none hover:border-primary focus:border-primary '
        >
          {range(1, 32).map((day) => (
            <option value={day} key={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          name='month'
          value={value?.getMonth() || date.month}
          onChange={handleChangeDate}
          className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-4 text-sm  outline-none hover:border-primary focus:border-primary '
        >
          {range(0, 12).map((month) => (
            <option value={month} key={month}>
              {month + 1}
            </option>
          ))}
        </select>
        <select
          name='year'
          value={value?.getFullYear() || date.year}
          onChange={handleChangeDate}
          className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-4 text-sm  outline-none hover:border-primary focus:border-primary '
        >
          {range(1990, new Date().getFullYear() + 1).map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
