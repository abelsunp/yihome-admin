import request from '@/utils/request'

// 查询标签内容列表
export function listDetail(query) {
  return request({
    url: '/home/detail/list',
    method: 'get',
    params: query
  })
}

// 查询标签内容详细
export function getDetail(id) {
  return request({
    url: '/home/detail/' + id,
    method: 'get'
  })
}

// 新增标签内容
export function addDetail(data) {
  return request({
    url: '/home/detail',
    method: 'post',
    data: data
  })
}

// 修改标签内容
export function updateDetail(data) {
  return request({
    url: '/home/detail',
    method: 'put',
    data: data
  })
}

// 删除标签内容
export function delDetail(id) {
  return request({
    url: '/home/detail/' + id,
    method: 'delete'
  })
}

// 导出标签内容
export function exportDetail(query) {
  return request({
    url: '/home/detail/export',
    method: 'get',
    params: query
  })
}