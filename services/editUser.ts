import axios, { AxiosError } from 'axios'
import { domainUrl, domainUrlAuth } from '../config/baseUrl'
import { getToken } from '../store/actions/auth'

export const useEditUser = (id, data,setError) => {
  async function editProduct() {
    setError('')
    domainUrl
    const url = `${domainUrlAuth}600/users/${id}`
    axios({
      method: 'put',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      data: data,
    })
      .then((res) => {
        console.log(res)
        data = res.data
        setError('User info updated')
      })
      .catch((error) => {
        const err = error as AxiosError
        setError(err.response?.data)
      })
  }
  editProduct()
  return {
    data
  }
}
