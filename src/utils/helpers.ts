export const formatCurrency = (value: number) => new Intl.NumberFormat('vi-VN', { style: 'decimal' }).format(value)

export const formatNumberToSocialStyle = (value: number) =>
  new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
