import request from '@/utils/request'

// 查询标签类型列表
export function listLabel(query) {
  return request({
    url: '/home/label/list',
    method: 'get',
    params: query
  })
}

// 查询标签类型详细
export function getLabel(id) {
  return request({
    url: '/home/label/' + id,
    method: 'get'
  })
}

// 新增标签类型
export function addLabel(data) {
  return request({
    url: '/home/label',
    method: 'post',
    data: data
  })
}

// 修改标签类型
export function updateLabel(data) {
  return request({
    url: '/home/label',
    method: 'put',
    data: data
  })
}

// 删除标签类型
export function delLabel(id) {
  return request({
    url: '/home/label/' + id,
    method: 'delete'
  })
}

// 导出标签类型
export function exportLabel(query) {
  return request({
    url: '/home/label/export',
    method: 'get',
    params: query
  })
}