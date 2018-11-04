/*Created By Jsir on 2018/4/25*/
'use strict'
import axios from 'axios'

const service = axios.create({
    baseURL: ''
})

service.interceptors.request.use(config => {
    config.headers['cache-control'] = 'no-cache, no-store, must-revalidate'
    return config
}, error => {
    console.log(error) // for debug
    Promise.reject(error)
})

service.interceptors.response.use(
    response => response,
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    })
export default service;