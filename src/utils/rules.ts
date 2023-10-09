import * as yup from 'yup'
import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: 'Vui lòng điền vào mục này',
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 ký tự'
    }
  },
  password: {
    required: 'Vui lòng điền vào mục này',
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  },
  confirm_password: {
    required: 'Vui lòng điền vào mục này',
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    validate: getValues
      ? (value) => value === getValues().password || 'Passwords không khớp. Vui lòng điền lại mục này'
      : undefined
  }
})

function testMinMax(this: yup.TestContext<yup.AnyObject>): boolean {
  const { price_max, price_min } = this.parent as { price_max: string; price_min: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_min) <= Number(price_max)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .email('Email không đúng định dạng')
    .required('Vui lòng điền vào mục này')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Vui lòng điền vào mục này')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Vui lòng điền vào mục này')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref('password')], 'Passwords không khớp. Vui lòng điền lại mục này'),

  price_min: yup.string().ensure().test({
    name: 'price-not-allowed',
    message: 'Vui lòng điền khoảng giá phù hợp',
    test: testMinMax
  }),
  price_max: yup.string().ensure().test({
    name: 'price-not-allowed',
    message: 'Vui lòng điền khoảng giá phù hợp',
    test: testMinMax
  }),
  search: yup.string().trim().required('Vui lòng nhập tên sản phẩm')
})

// export const registerSchema = schema.omit(['price_min', 'price_max'])
export const loginSchema = schema.pick(['email', 'password'])
export const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export const priceSchema = schema.pick(['price_min', 'price_max'])
export const searchSchema = schema.pick(['search'])

export type Schema = yup.InferType<typeof schema>
export type LoginSchema = yup.InferType<typeof loginSchema>
export type RegisterSchema = yup.InferType<typeof registerSchema>
export type PriceSchema = yup.InferType<typeof priceSchema>
export type SearchSchema = yup.InferType<typeof searchSchema>
