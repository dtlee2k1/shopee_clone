export const formatCurrency = (value: number) => new Intl.NumberFormat('vi-VN', { style: 'decimal' }).format(value)

export const formatNumberToSocialStyle = (value: number) =>
  new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
    .format(value)
    .replace('.', ',')
    .toLowerCase()

export const rateSale = (originalPrice: number, price: number) => {
  const percent = Math.round(((originalPrice - price) / originalPrice) * 100) + '%'
  return percent
}
