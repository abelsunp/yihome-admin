import request from '@/utils/request'

// 流程用户获取
export function listProcessUsers(query) {
  return request({
    url: '/process/user/list',
    method: 'post',
    data: query
  })
}




// 查询【请填写功能名称】列表
export function listUser(query) {
  return request({
    url: '/process/user/list',
    method: 'post',
    data: query
  })
}

// 查询【请填写功能名称】详细
export function getUser(id) {
  return request({
    url: '/process/user/edit/' + id,
    method: 'get'
  })
}



export function canSelect(data) {
  return request({
    url: '/process/user/systemUserList',
    method: 'post',
    params: data
  })
}

// 新增【请填写功能名称】
export function addUser(data) {
  return request({
    url: '/process/user/add',
    method: 'post',
    params: data
  })
}

// 修改【请填写功能名称】
export function updateUser(data) {
  return request({
    url: '/process/user/edit',
    method: 'post',
    params: data
  })
}

// 删除【请填写功能名称】
export function delUser(data) {
  return request({
    url: '/process/user/remove',
    method: 'post',
    params: data
  })
}

// 导出【请填写功能名称】
export function exportUser(query) {
  return request({
    url: '/process/group/export',
    method: 'post',
    params: query
  })
}