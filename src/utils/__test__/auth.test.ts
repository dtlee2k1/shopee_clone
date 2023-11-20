import { beforeEach, describe, expect, it } from 'vitest'
import {
  clearLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTMxYWYxOTdlOTU5MDMzNzJmMmU4YiIsImVtYWlsIjoibGR0aGFuZzIwMDAyMDAxQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTAtMjlUMTc6MjY6MDAuOTg0WiIsImlhdCI6MTY5ODYwMDM2MCwiZXhwIjoxNjk4NjA3NTYwfQ.OGvaUWTH1GyaEgwFDeY8RbLxz0VYWOo-llqVA8YTtOs'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTMxYWYxOTdlOTU5MDMzNzJmMmU4YiIsImVtYWlsIjoibGR0aGFuZzIwMDAyMDAxQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMTAtMjlUMTA6NTM6MTYuMzMwWiIsImlhdCI6MTY5ODU3Njc5NiwiZXhwIjoxNzMwMTEyNzk2fQ.JNIhVCni4JJUU3paTNutoLi2YOY7oqZFaH_eiS-xZ8w'

const profile =
  '{"_id":"65131af197e95903372f2e8b","roles":["User"],"email":"ldthang20002001@gmail.com","createdAt":"2023-09-26T17:54:57.806Z","updatedAt":"2023-10-24T17:55:22.049Z","__v":0,"name":"Lê Đức Thái ","address":"Hanoi ","date_of_birth":"2001-09-09T17:00:00.000Z","phone":"123456","avatar":"22d6e9b8-7139-4c40-8252-fa2252c6d9b2.jpg"}'

beforeEach(() => {
  localStorage.clear()
})

describe('setAccessTokenToLS', () => {
  it('set access_token to LocalStorage', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('setRefreshTokenToLS', () => {
  it('set refresh_token to LocalStorage', () => {
    setRefreshTokenToLS(refresh_token)
    expect(getRefreshTokenFromLS()).toBe(refresh_token)
  })
})

describe('setProfileToLS', () => {
  it('set profile to LocalStorage', () => {
    setProfileToLS(JSON.parse(profile))
    expect(localStorage.getItem('profile')).toEqual(profile)
  })
})

describe('clearLS', () => {
  it('clear LocalStorage', () => {
    setAccessTokenToLS(access_token)
    setRefreshTokenToLS(refresh_token)
    setProfileToLS(JSON.parse(profile))

    clearLS()

    expect(getProfileFromLS()).toBe(null)
    expect(getAccessTokenFromLS()).toBe('')
    expect(getRefreshTokenFromLS()).toBe('')
  })
})
