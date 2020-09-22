import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listGroup(query) {
  return request({
    url: '/process/group/list',
    method: 'post',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getGroup(id) {
  return request({
    url: '/process/group/edit/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addGroup(data) {
  return request({
    url: '/process/group/add',
    method: 'post',
    params: data
  })
}

// 修改【请填写功能名称】
export function updateGroup(data) {
  return request({
    url: '/process/group/edit',
    method: 'post',
    params: data
  })
}

// 删除【请填写功能名称】
export function delGroup(data) {
  return request({
    url: '/process/group/remove',
    method: 'post',
    params: data
  })
}

// 导出【请填写功能名称】
export function exportGroup(query) {
  return request({
    url: '/process/group/export',
    method: 'post',
    params: query
  })
}