import request from '@/utils/request'

// 查询订单列表
export function listOrder(query) {
  return request({
    url: '/order/order/list',
    method: 'post',
    data: query
  })
}

// 查询订单详细
export function getOrder(id) {
  return request({
    url: '/order/order/' + id,
    method: 'get'
  })
}

// 新增订单
export function addOrder(data) {
  return request({
    url: '/order/order',
    method: 'post',
    data: data
  })
}

// 修改订单
export function updateOrder(data) {
  return request({
    url: '/order/order',
    method: 'put',
    data: data
  })
}



// 删除订单
export function delOrder(id) {
  return request({
    url: '/order/order/' + id,
    method: 'delete'
  })
}

// 导出订单
export function exportOrder(query) {
  return request({
    url: '/order/order/export',
    method: 'get',
    params: query
  })
}




/**
 * 
 * 订单用户信息
 * 
 */
// 新增或修改订单用户 
export function addOrderUser(query) {
    return request({
      url: '/order/users',
      method: 'post',
      data: query
    })
}
//删除订单用户
export function delOrderUsers(query) {
    return request({
        url: '/order/users/delete',
        method: 'post',
        params: query
      })
  }






// 新增或修改订单房源 
export function addOrderHouse(query) {
    return request({
      url: '/order/rooms',
      method: 'post',
      data: query
    })
}

//删除订单房源
export function delOrderHouse(query) {
    return request({
        url: '/order/rooms/delete',
        method: 'delete',
        params: query
      })
  }




//订单审核
export function orderSubApply(query) {
  return request({
    url: '/order/order/submitApply',
    method: 'post',
    params: query
  })
}


//审批历史
export function orderHistory(query) {
  return request({
    url: '/process/general/listHistory',
    method: 'post',
    params: query
  })
}

//审批流程
export function orderReadResource(query) {
  return request({
    url: '/process/general/read-resource',
    method: 'post',
    params: query,
    responseType:'blob'
  })
}



//得到预付服务费
export function orderFreeMoney(query) {
  return request({
    url: '/order/order/getFreeMoney',
    method: 'post',
    params: query
  })
}



//订单内部佣金金额获取
export function orderRoleList(query) {
  return request({
    url: '/order/role/list',
    method: 'get',
    params: query
  })
}





//获取单个订单的佣金
export function orderInnerMoney(query) {
  return request({
    url: '/order/order/getInnerMoney',
    method: 'post',
    params: query
  })
}

//获取批量订单的佣金
export function getBatchInnerMoney(query) {
  return request({
    url: '/order/order/getBatchInnerMoney',
    method: 'post',
    data: query
  })
}




//获取批量订单的佣金
export function commissionPay(query) {
  return request({
    url: '/order/order/commissionPay',
    method: 'post',
    data: query
  })
}



//确认入住
export function comfirmCheckIn(query) {
  return request({
    url: '/order/order/comfirmCheckIn',
    method: 'post',
    params: query
  })
}