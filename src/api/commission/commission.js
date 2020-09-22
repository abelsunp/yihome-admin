import request from '@/utils/request'

//获取list
export function listCommission(query) {
    return request({
      url: '/home/amount/list',
      method: 'get',
      params: query
    })
}



//新增 佣金 
export function addCommissionMethods(query) {
    return request({
      url: '/home/amount',
      method: 'post',
      data: query
    })
}


//获取
export function getCommissionMethods(id) {
    return request({
      url: '/home/amount/' + id,
      method: 'get'
    })
  }


// 修改
export function updateCommission(data) {
    return request({
      url: '/home/amount',
      method: 'put',
      data: data
    })
  }




//新增同步
export function addHouseSync(query) {
  return request({
    url: '/user/sync',
    method: 'post',
    data: query
  })
}

export function listHouseSync(query) {
  return request({
    url: '/user/sync/list',
    method: 'get',
    params: query
  })
}
export function getHouseSync(id) {
  return request({
    url: '/user/sync/' + id,
    method: 'get'
  })
}
export function updateHouseSync(query) {
  return request({
    url: '/user/sync/edit',
    method: 'post',
    data: query
  })
}