import request from '@/utils/request'

// 查询城市管理列表
export function listCity(query) {
  return request({
    url: '/home/city/list',
    method: 'get',
    params: query
  })
}

// 查询城市管理详细
export function getCity(id) {
  return request({
    url: '/home/city/' + id,
    method: 'get'
  })
}

// 新增城市管理
export function addCity(data) {
  return request({
    url: '/home/city',
    method: 'post',
    data: data
  })
}

// 修改城市管理
export function updateCity(data) {
  return request({
    url: '/home/city',
    method: 'put',
    data: data
  })
}

// 删除城市管理
export function delCity(id) {
  return request({
    url: '/home/city/' + id,
    method: 'delete'
  })
}

// 导出城市管理
export function exportCity(query) {
  return request({
    url: '/home/city/export',
    method: 'get',
    params: query
  })
}