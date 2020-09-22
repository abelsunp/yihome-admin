import request from '@/utils/request'

// 查询附近地点或者目的地列表
export function listAddress(query) {
  return request({
    url: '/home/address/list',
    method: 'get',
    params: query
  })
}

// 查询附近地点或者目的地详细
export function getAddress(id) {
  return request({
    url: '/home/address/' + id,
    method: 'get'
  })
}

// 新增附近地点或者目的地
export function addAddress(data) {
  return request({
    url: '/home/address',
    method: 'post',
    data: data
  })
}

// 修改附近地点或者目的地
export function updateAddress(data) {
  return request({
    url: '/home/address',
    method: 'put',
    data: data
  })
}

// 删除附近地点或者目的地
export function delAddress(id) {
  return request({
    url: '/home/address/' + id,
    method: 'delete'
  })
}

// 导出附近地点或者目的地
export function exportAddress(query) {
  return request({
    url: '/home/address/export',
    method: 'get',
    params: query
  })
}