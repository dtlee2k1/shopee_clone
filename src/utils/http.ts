import axios, { AxiosError, AxiosInstance, HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type'
import config from 'src/constants/config'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponse } from 'src/types/utils.type'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'

class Http {
  private instance: AxiosInstance
  // Why have to set an accessToken variable instead of get right away from local storage?
  //Set accessToken here in class since the speed of read data in hardware(localStorage) is not as fast as the speed of RAM memory (in class)
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    // Set accessToken by localStorage only the first time website initialization
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24, // 1 day
        'expire-refresh-token': 60 * 60 * 24 * 365 // 1 year
      }
    })

    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) config.headers.Authorization = this.accessToken
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/login' || url === '/register') {
          const data = (response.data as AuthResponse).data
          this.accessToken = data.access_token
          this.refreshToken = data.refresh_token

          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          setProfileToLS(data.user)
        } else if (url === '/logout') {
          this.accessToken = this.refreshToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        // Only toast error messages are NOT 401 & 422 error
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const errorMessage = data.data?.message || error.message || data.message
          toast.error(errorMessage)
        }

        // Unauthorized Error (401)
        // - Sending wrong token
        // - Not sending token
        // - token was expired*
        if (isAxiosUnauthorizedError<ErrorResponse<{ message: string; name: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          // Error Case: Token expired & this error request does not belong to request refresh token => invoke refresh token
          if (isAxiosExpiredTokenError(error) && url !== '/refresh-access-token') {
            // Help to prevent to invoke request refresh token twice
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              // Passing to instance axios a `config` params means that Recall this error request again
              return this.instance({ ...config, headers: { ...config.headers, Authorization: access_token } })
            })
          }

          // Other cases: `Sending wrong token`, `Not sending token` & `token was expired but invoked refresh token FAILED` => Clear local storage & toast error message
          clearLS()
          this.accessToken = this.refreshToken = ''
          toast.error(error.response?.data.data?.message)
        }
        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>('/refresh-access-token', {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLS()
        this.accessToken = this.refreshToken = ''

        throw error
      })
  }

  public getInstance() {
    return this.instance
  }
}

const http = new Http().getInstance()

export default http
