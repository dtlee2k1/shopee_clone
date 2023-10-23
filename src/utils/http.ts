import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
import config from 'src/constants/config'
class Http {
  private instance: AxiosInstance
  // Why have to set an accessToken variable instead of get right away from local storage?
  //Set accessToken here in class since the speed of read data in hardware(localStorage) is not as fast as the speed of RAM memory (in class)
  private accessToken: string

  constructor() {
    // Set accessToken by localStorage only the first time website initialization
    this.accessToken = getAccessTokenFromLS()

    this.instance = axios.create({
      baseURL: config.baseURL,
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
          const data = (response.data as AuthResponse).data
          this.accessToken = data.access_token

          setAccessTokenToLS(this.accessToken)
          setProfileToLS(data.user)
        } else if (url === '/logout') {
          this.accessToken === ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const errorMessage = data?.message || error.message
          toast.error(errorMessage)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
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
