/* eslint-disable */
import {
    AUTH_ACTION,
    LOGOUT_ACTION,
    AUTO_LOGIN_ACTION,
    GET_USER_TOKEN_GETTER,
    IS_USER_VERIFIED_ACTION,
    LOGIN_ACTION,
    SET_USER_TOKEN_DATA_MUTATION,
    VERIFYING_USER_ACTION,
    TEST,
} from '../../storeConstants'
import axiosInstance from '../../../services/axios/axiosInstance'
import store from '../../index';
import Axios from 'axios';
// import axiosTokenInstance from '../../../services/axios/axiosTokenInstance'

export default {
    async [TEST](){
        let response = ''

        try {
            response = await axiosInstance.get(
                "/test"
            )
        } catch (error) {
            throw error.response.data
        }

        return response
    },
    async [LOGIN_ACTION](context, payload) {
        return context.dispatch(AUTH_ACTION, {
            ...payload,
            url: "/auth/login"
        })

    },
    async [AUTH_ACTION](context, payload) {

        let postData = payload.userData

        let response = ''


        try {
            response = await axiosInstance.post(
                payload.url,
                postData
            )
              if (response.status === 200) {
                let tokenData = {
                    userEmail: response.data.data.email,
                    userName: response.data.data.name,
                    userId: response.data.data.id,
                    token: response.data.token
                }
                localStorage.setItem('AuditUserData', JSON.stringify(tokenData))
                context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData)

            }

            return response
        } catch (err) {
            throw err.response.data
        }

    },
    [AUTO_LOGIN_ACTION](context) {
        let userData = localStorage.getItem('AuditUserData')
        if (userData) {
            context.commit(SET_USER_TOKEN_DATA_MUTATION, JSON.parse(userData))
        }
    },
    async [LOGOUT_ACTION](context) {
        let response = ''

        try {
            response = await axiosInstance.get(
                "/auth/logout",
            )
            let tokenData = {
                userEmail: '',
                userName: '',
                userId: '',
                token: ''
            }
            localStorage.removeItem("AuditUserData");
            context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData)
            return response
        } catch (e){
            throw e.response
        }
    }
}
