import request from '@/utils/request'

// 查询词典列表
export function listDictionaries(query) {
  return request({
    url: '/user/dictionaries/list',
    method: 'get',
    params: query
  })
}

// 查询词典详细
export function getDictionaries(id) {
  return request({
    url: '/user/dictionaries/' + id,
    method: 'get'
  })
}

// 新增词典
export function addDictionaries(data) {
  return request({
    url: '/user/dictionaries',
    method: 'post',
    data: data
  })
}

// 修改词典
export function updateDictionaries(data) {
  return request({
    url: '/user/dictionaries',
    method: 'put',
    data: data
  })
}

// 删除词典
export function delDictionaries(id) {
  return request({
    url: '/user/dictionaries/' + id,
    method: 'delete'
  })
}

// 导出词典
export function exportDictionaries(query) {
  return request({
    url: '/user/dictionaries/export',
    method: 'get',
    params: query
  })
}