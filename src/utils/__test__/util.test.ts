import { describe, expect, it } from 'vitest'
import { isAxiosError, isAxiosUnprocessableEntityError } from '../utils'
import { AxiosError, HttpStatusCode } from 'axios'

describe('isAxiosError', () => {
  it('isAxiosError return boolean', () => {
    expect(isAxiosError(new Error())).toEqual(false)
    expect(isAxiosError(new AxiosError())).toEqual(true)
  })
})

describe('isAxiosUnprocessableEntityError', () => {
  it('isAxiosUnprocessableEntityError return boolean', () => {
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
