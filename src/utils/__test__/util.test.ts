import { describe, expect, it } from 'vitest'
import { isAxiosError, isAxiosUnprocessableEntityError } from '../utils'
import { AxiosError, HttpStatusCode } from 'axios'

// `describe` dùng để mô tả tập hợp các ngữ cảnh
// hoặc 1 đơn vị cần test: VD function, component
describe('isAxiosError', () => {
  // `it` dùng để ghi chú case cần test
  it('isAxiosError return boolean', () => {
    // `expect` dùng để mong đợi giá trị trả về
    expect(isAxiosError(new Error())).toEqual(false)
    expect(isAxiosError(new AxiosError())).toEqual(true)
  })
})

describe('isAxiosUnprocessableEntityError', () => {
  // `it` dùng để ghi chú case cần test
  it('isAxiosUnprocessableEntityError return boolean', () => {
    // `expect` dùng để mong đợi giá trị trả về
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: undefined
        } as any)
      )
    ).toEqual(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: undefined
        } as any)
      )
    ).toEqual(true)
  })
})
