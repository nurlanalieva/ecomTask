import { useEffect, useState } from 'react'
import axios from 'axios'
import { domainUrlAuth } from '../config/baseUrl'
import { getToken } from '../store/actions/auth'
import { IUser } from '../interfaces/IUser'

export const useGetUser = (id) => {
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    async function getProduct() {
      axios({
        method: 'get',
        url: `${domainUrlAuth}600/users/${id}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
      })
        .then((res) => {
          setUser(res.data)
        })
        .catch((err) => {
          console.log(err);
        })
    }
    getProduct()
  }, [])
  return {
    user,
  }
}
