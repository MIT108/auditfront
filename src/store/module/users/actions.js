/* eslint-disable */
import {
  UPDATE_USER_INFORMATION,
  GET_USER_TOKEN_GETTER,
  SET_USER_TOKEN_DATA_MUTATION,
  GET_USER_NAME,
  CREATE_NEW_USER
} from '../../storeConstants'
import axiosInstance from '../../../services/axios/axiosInstance'
import store from '../../index'

export default {
  async [UPDATE_USER_INFORMATION]({commit}, payload) {
    let response = ''

    try {
      response = await axiosInstance.post(
        "/user/update",
        payload
      )
      if (response.status === 200) {
        const token = store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
        let tokenData = {
          userEmail: response.data.data.email,
          userName: response.data.data.name,
          userId: response.data.data.id,
          token: token
        }
        localStorage.setItem('AuditUserData', JSON.stringify(tokenData))

      }
      return response
    } catch (error) {
      console.log(error);
      throw error.response
    }

  },
  async [CREATE_NEW_USER](context, payload){
    let response = ''

    try {
      response = await axiosInstance.post(
        "/user/create",
        payload
      )
      return response
    } catch (error) {
      throw error.response
    }
  }

}
