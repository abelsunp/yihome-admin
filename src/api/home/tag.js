import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listTag(query) {
  return request({
    url: '/home/tag/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getTag(id) {
  return request({
    url: '/home/tag/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addTag(data) {
  return request({
    url: '/home/tag',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateTag(data) {
  return request({
    url: '/home/tag',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delTag(id) {
  return request({
    url: '/home/tag/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportTag(query) {
  return request({
    url: '/home/tag/export',
    method: 'get',
    params: query
  })
}