/* eslint-disable */
import {
  CREATE_NEW_ROLE,
  DELETE_ROLE,
  LIST_ALL_ROLE,
  UPDATE_ROLE,
  LIST_TOTAL_ROLE,
  CREATE_COURIER
} from '../../storeConstants'
import axiosInstance from '../../../services/axios/axiosInstance'
import store from '../../index'

export default {
  async [CREATE_COURIER](context, payload) {
    let response = ''

    try {
      response = await axiosInstance.post(
        "/courier/create",
        payload,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response
    } catch (error) {
      throw error.response
    }

  },

  async [LIST_ALL_ROLE](context, payload) {
    let response = ''

    try {
      response = await axiosInstance.get(
        "/role/listAll"
      )
      return response
    } catch (error) {
      throw error.response
    }
  },


  async [LIST_TOTAL_ROLE](context, payload) {
    let response = ''

    try {
      response = await axiosInstance.get(
        "/role/list"
      )
      return response
    } catch (error) {
      throw error.response
    }
  },

  async [UPDATE_ROLE](context, payload) {
    let response = ''
    try {
      response = await axiosInstance.post(
        "/role/update",
        payload
      )
      return response
    } catch (error) {
      throw error.response
    }
  },

  async [DELETE_ROLE](context, payload) {
    let response = ''
    try {
      response = await axiosInstance.get(
        '/role/delete/'+payload
      )
      return response
    } catch (error) {
      throw error.response
    }
  }

}
