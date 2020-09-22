import request from '@/utils/request'

// 查询待办事项列表
export function listItem(query) {
  return request({
    url: '/process/todoitem/list',
    method: 'post',
    data: query
  })
}

// 查询待办事项详细
export function getItem(id) {
  return request({
    url: '/home/item/' + id,
    method: 'get'
  })
}

// 新增待办事项
export function addItem(data) {
  return request({
    url: '/home/item',
    method: 'post',
    data: data
  })
}

// 修改待办事项
export function updateItem(data) {
  return request({
    url: '/home/item',
    method: 'put',
    data: data
  })
}

// 删除待办事项
export function delItem(id) {
  return request({
    url: '/home/item/' + id,
    method: 'delete'
  })
}

// 导出待办事项
export function exportItem(query) {
  return request({
    url: '/home/item/export',
    method: 'get',
    params: query
  })
}




//通过事项编号获取订单详情
export function useItemNamegetOrder(data) {
    return request({
      url: '/order/order/getInfoByNo',
      method: 'post',
      params: data
    })
  }


//订单完成
export function orderAudit(data) {
    return request({
      url: '/order/order/audit',
      method: 'post',
      data: data
    })
  }





// 查询已办事项列表
export function listDoneItem(query) {
  return request({
    url: '/process/todoitem/doneList',
    method: 'post',
    data: query
  })
}




// 佣金审核
export function commissionAudit(query) {
  return request({
    url: '/order/commission/audit',
    method: 'post',
    data: query
  })
}