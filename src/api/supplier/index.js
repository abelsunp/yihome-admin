import request from '@/utils/request'

// 查询供应商基础信息列表
export function listSupplier(query) {
  return request({
    url: '/home/supplier/list',
    method: 'get',
    params: query
  })
}

// 查询供应商基础信息详细
export function getSupplier(id) {
  return request({
    url: '/home/supplier/' + id,
    method: 'get'
  })
}

// 新增供应商基础信息
export function addSupplier(data) {
  return request({
    url: '/home/supplier',
    method: 'post',
    data: data
  })
}

// 修改供应商基础信息
export function updateSupplier(data) {
  return request({
    url: '/home/supplier/edit',
    method: 'post',
    data: data
  })
}

// 删除供应商基础信息
export function delSupplier(id) {
  return request({
    url: '/home/supplier/' + id,
    method: 'delete'
  })
}

// 导出供应商基础信息
export function exportSupplier(query) {
  return request({
    url: '/home/supplier/export',
    method: 'get',
    params: query
  })
}

export function SuppliersTest(data) {
  return request({
    url: '/process/user/list',
    method: 'post',
    data: data
  })
}




//新增供应商联系人信息
export function addSupplierContact(data) {
  return request({
    url: '/home/contact',
    method: 'post',
    data: data
  })
}

// 修改供应商联系人信息
export function updateSupplierContact(data) {
  return request({
    url: '/home/contact',
    method: 'put',
    data: data
  })
}


// 查询联系人详情
export function getContactDetails(id) {
  return request({
    url: '/home/contact/' + id,
    method: 'get'
  })
}



// 查询供应商联系人信息
export function getSupplierContact(data) {
  return request({
    url: '/home/contact/list',
    method: 'get',
    params: data
  })
}

// 删除联系人
export function delSupplierContact(id) {
  return request({
    url: '/home/contact/' + id,
    method: 'delete'
  })
}

/**
 * 供应商同步信息
 */
// 
//获取列表
export function getSupplierSyncList(data) {
  return request({
    url: '/home/sync/list',
    method: 'get',
    params: data
  })
}
//新增
export function addSupplierSync(data) {
  return request({
    url: '/home/sync',
    method: 'POST',
    data: data
  })
}
//修改
export function updateSupplierSync(data) {
  return request({
    url: '/home/sync/edit',
    method: 'POST',
    data: data
  })
}
//获取详情
export function getSyncDetails(id) {
  return request({
    url: '/home/sync/' + id,
    method: 'get'
  })
}


/**
 * 供应商附件信息
 * 
 */

////获取附件
export function getSupplierAccessoryList(data) {
  return request({
    url: '/home/accessory/list',
    method: 'get',
    params: data
  })
}
//新增附件
export function addSupplierAccessory(data) {
  return request({
    url: '/home/accessory',
    method: 'POST',
    data: data
  })
}
//修改附件
export function updateSupplierAccessory(data) {
  return request({
    url: '/home/accessory/edit',
    method: 'POST',
    data: data
  })
}

// 删除附件
export function delAccessory(id) {
  return request({
    url: '/home/accessory/' + id,
    method: 'delete'
  })
}




//合同获取
export function getContract(data) {
  return request({
    url: '/home/supplier/amount/list',
    method: 'get',
    params: data
  })
}

//合同新增
export function addContract(data) {
  return request({
    url: '/home/supplier/amount',
    method: 'post',
    data: data
  })
}

//合同修改
export function editContract(data) {
  return request({
    url: '/home/supplier/amount',
    method: 'post',
    data: data
  })
}
