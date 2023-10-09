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

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = (name: string, id: string) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}
