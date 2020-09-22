import request from '@/utils/request'

// 查询供应商佣金订单列表
export function listCommission(query) {
  return request({
    url: '/order/commission/list',
    method: 'get',
    params: query
  })
}

// 查询供应商佣金订单详细
export function getCommission(id) {
  return request({
    url: '/order/commission/' + id,
    method: 'get'
  })
}

// 新增供应商佣金订单
export function addCommission(data) {
  return request({
    url: '/order/commission',
    method: 'post',
    data: data
  })
}

// 修改供应商佣金订单
export function updateCommission(data) {
  return request({
    url: '/order/commission/edit',
    method: 'post',
    data: data
  })
}

// 删除供应商佣金订单
export function delCommission(data) {
  return request({
    url: '/order/commission/lose',
    method: 'post',
    params: data
  })
}

// 导出供应商佣金订单
export function exportCommission(query) {
  return request({
    url: '/order/commission/export',
    method: 'get',
    params: query
  })
}


export function orderCompanyInfo(query) {
    return request({
      url: '/order/commission/getCompanyInfo',
      method: 'get',
      params: query
    })
  }




  //佣金结算成功订单
  export function addCommissionSuccesd(data) {
    return request({
      url: '/order/succeed',
      method: 'post',
      data: data
    })
  }


//申请
export function submitApply(data) {
  return request({
    url: '/order/commission/submitApply',
    method: 'post',
    params: data
  })
}






//获取成功的列表
export function listSuccess(data) {
  return request({
    url: '/order/succeed/list',
    method: 'get',
    params: data
  })
}

export function listSuccessDetails(id) {
  return request({
    url: '/order/succeed/'+id,
    method: 'get',
  })
}

export function updateSuccessDetails(data) {
  return request({
    url: '/order/succeed',
    method: 'put',
    data:data
  })
}


export function loseSuccessOrder(data) {
  return request({
    url: '/order/succeed/loseSuccessOrder',
    method: 'post',
    params:data
  })
}


export function commissionUpload(data) {
  return request({
    url: '/common/upload',
    method: 'post',
    params:data
  })
}




//获取可选择的订单



export function getcommissionList(data) {
  return request({
    url: '/order/order/commissionList',
    method: 'post',
    data:data
  })
}
