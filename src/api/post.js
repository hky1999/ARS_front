import axios from '@/libs/api.request'

export const getAllPost = () => {
  return axios.request({
    url: '/api/post/get/list',
    method: 'post'
  })
}

export const getAllPostComment = () => {
  return axios.request({
    url: '/api/post/comment/get/list',
    method: 'post'
  })
}

export const getPostByPid = pid => {
  return axios.request({
    url: '/api/post/get/info',
    data: pid,
    method: 'post'
  })
}

export const deletePostByPid = postId => {
  return axios.request({
    url: '/api/post/delete',
    data: postId,
    method: 'post'
  })
}

export const deletePostCommentByPcid = pcId => {
  return axios.request({
    url: '/api/post/comment/delete',
    data: pcId,
    method: 'post'
  })
}
