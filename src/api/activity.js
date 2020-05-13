/* eslint-disable */
import axios from '@/libs/api.request'

export const authorizeActivityByAid = (oper) => {
  return axios.request({
    url: '/api/activity/authorize',
    data: oper,
    method: 'post'
  })
}

export const getActivityInfoByAid = (aid) => {
  return axios.request({
    url: '/api/activity/getactivitybyid',
    data: aid,
    method: 'post'
  })
}


