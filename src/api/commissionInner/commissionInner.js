import request from '@/utils/request'

// 查询订单内部佣金流程角色列表
export function listRole(data) {
  return request({
    url: '/order/role/innerlist',
    method: 'post',
    data: data
  })
}

// 查询订单内部佣金流程角色详细
export function getRole(id) {
  return request({
    url: '/order/role/' + id,
    method: 'get'
  })
}

// 新增订单内部佣金流程角色
export function addRole(data) {
  return request({
    url: '/order/role',
    method: 'post',
    data: data
  })
}

// 修改订单内部佣金流程角色
export function updateRole(data) {
  return request({
    url: '/order/role',
    method: 'put',
    data: data
  })
}

// 删除订单内部佣金流程角色
export function delRole(id) {
  return request({
    url: '/order/role/' + id,
    method: 'delete'
  })
}

// 导出订单内部佣金流程角色
export function exportRole(query) {
  return request({
    url: '/order/role/export',
    method: 'get',
    params: query
  })
}