import request from '@/utils/request'

export function uploadTest(data) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data: data
  })
}