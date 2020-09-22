import request from '@/utils/request'

// 查询佣金列表
export function listCommission(query) {
  return request({
    url: '/commission/list',
    method: 'get',
    params: query
  })
}


// 查询佣金规则列表
export function listCommissionRules(query) {
    return request({
      url: '/commission/rule/list',
      method: 'get',
      params: query
    })
  }

// 新增佣金
export function addCommission(data) {
    return request({
      url: '/commission',
      method: 'post',
      data: data
    })
  }

//编辑佣金
export function editCommission(data) {
    return request({
      url: '/commission/edit',
      method: 'post',
      data: data
    })
  }


// 查询佣金详细
export function getCommissionDetails(id) {
    return request({
      url: '/commission/' + id,
      method: 'get'
    })
  }

// 删除佣金
export function delCommission(id) {
    return request({
      url: '/commission/' + id,
      method: 'delete'
    })
  }


// 查询佣金规则详细
export function getCommissionRulesDetails(id) {
    return request({
      url: '/commission/rule/' + id,
      method: 'get'
    })
  }

  // 删除佣金规则
export function delCommissionRules(id) {
    return request({
      url: '/commission/rule/' + id,
      method: 'delete'
    })
  }
//编辑佣金规则
  export function editCommissionRules(data) {
    return request({
      url: '/commission/rule/edit',
      method: 'post',
      data: data
    })
  }