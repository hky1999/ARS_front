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

export const getActivityCommentByAid = (aid) => {
  return axios.request({
    url: '/api/comment/get/activity',
    data: aid,
    method: 'post'
  })
}

export const deleteActivityComment = (commentId) => {
  return axios.request({
    url: '/api/comment/delete',
    data: commentId,
    method: 'post'
  })
}


