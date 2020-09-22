import request from '@/utils/request'

// 查询供应商服务费佣金条件列表
export function listCharge(query) {
  return request({
    url: '/commission/charge/list',
    method: 'get',
    params: query
  })
}

// 查询供应商服务费佣金条件详细
export function getCharge(id) {
  return request({
    url: '/commission/charge/' + id,
    method: 'get'
  })
}

// 新增供应商服务费佣金条件
export function addCharge(data) {
  return request({
    url: '/commission/charge',
    method: 'post',
    data: data
  })
}

// 修改供应商服务费佣金条件
export function updateCharge(data) {
  return request({
    url: '/commission/charge/edit',
    method: 'post',
    data: data
  })
}

// 删除供应商服务费佣金条件
export function delCharge(id) {
  return request({
    url: '/commission/charge/' + id,
    method: 'delete'
  })
}

// 导出供应商服务费佣金条件
export function exportCharge(query) {
  return request({
    url: '/commission/charge/export',
    method: 'get',
    params: query
  })
}