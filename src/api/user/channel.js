import request from '@/utils/request'

// 查询渠道列表
export function listChannel(query) {
  return request({
    url: '/user/channel/list',
    method: 'get',
    params: query
  })
}

// 查询渠道详细
export function getChannel(id) {
  return request({
    url: '/user/channel/' + id,
    method: 'get'
  })
}

// 新增渠道
export function addChannel(data) {
  return request({
    url: '/user/channel',
    method: 'post',
    data: data
  })
}

// 修改渠道
export function updateChannel(data) {
  return request({
    url: '/user/channel',
    method: 'put',
    data: data
  })
}

// 删除渠道
export function delChannel(id) {
  return request({
    url: '/user/channel/' + id,
    method: 'delete'
  })
}

// 导出渠道
export function exportChannel(query) {
  return request({
    url: '/user/channel/export',
    method: 'get',
    params: query
  })
}