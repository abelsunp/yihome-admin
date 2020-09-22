import request from '@/utils/request'

// 查询国家列表
export function listCountry(query) {
  return request({
    url: '/home/country/list',
    method: 'get',
    params: query
  })
}

// 查询国家详细
export function getCountry(id) {
  return request({
    url: '/home/country/' + id,
    method: 'get'
  })
}

// 新增国家
export function addCountry(data) {
  return request({
    url: '/home/country',
    method: 'post',
    data: data
  })
}

// 修改国家
export function updateCountry(data) {
  return request({
    url: '/home/country',
    method: 'put',
    data: data
  })
}

// 删除国家
export function delCountry(id) {
  return request({
    url: '/home/country/' + id,
    method: 'delete'
  })
}

// 导出国家
export function exportCountry(query) {
  return request({
    url: '/home/country/export',
    method: 'get',
    params: query
  })
}