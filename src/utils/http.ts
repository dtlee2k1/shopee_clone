import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import { clearAccessTokenFromLS, getAccessTokenFromLS, saveAccessTokenToLS } from './auth'
class Http {
  private instance: AxiosInstance
  // Why have to set an accessToken variable instead of get right away from local storage?
  //Set accessToken here in class since the speed of read data in hardware(localStorage) is not as fast as the speed of RAM memory (in class)
  private accessToken: string

  constructor() {
    // Set accessToken by localStorage only the first time website initialization
    this.accessToken = getAccessTokenFromLS()

    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) config.headers.authorization = this.accessToken
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
          this.accessToken = (response.data as AuthResponse).data.access_token
          saveAccessTokenToLS(this.accessToken)
        } else if (url === '/logout') {
          this.accessToken === ''
          clearAccessTokenFromLS()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const errorMessage = data.message || error.message
          toast.error(errorMessage)
        }
        return Promise.reject(error)
      }
    )
  }

  getInstance() {
    return this.instance
  }
}

const http = new Http().getInstance()

export default http
