import request from '@/utils/request'

// 查询用户列表
export function listUsers(query) {
  return request({
    url: '/user/users/allList',
    method: 'post',
    data: query
  })
}

export function allSalesList(query) {
  return request({
    url: '/user/users/allSalesList',
    method: 'post',
    data: query
  })
}

export function allChannelList(query) {
  return request({
    url: '/user/users/allChannelList',
    method: 'post',
    data: query
  })
}



// 查询用户详细
export function getUsers(id) {
  return request({
    url: '/user/users/selectById?id=' + id,
    method: 'get'
  })
}


// 新增用户
export function addUser(query) {
  return request({
    url: '/user/users/add',
    method: 'post',
    data: query
  })
}

// 编辑用户
export function editUser(query) {
  return request({
    url: '/user/users/edit',
    method: 'post',
    data: query
  })
}

// 查询联系人信息
export function selectGuaranteeByUserid(id) {
  return request({
    url: '/user/users/selectGuaranteeByUserid?userId=' + id,
    method: 'post',
  })
}

// 新增联系人信息
export function addGuarantee(query) {
  return request({
    url: '/user/users/addGuarantee',
    method: 'post',
    data: query
  })
}

// 编辑联系人信息
export function editGuarantee(query) {
  return request({
    url: '/user/users/editGuarantee',
    method: 'post',
    data: query
  })
}


//查询图片
export function selectImageByUserid(id) {
  return request({
    url: '/user/users/selectImageByUserid?userId=' + id,
    method: 'post',
  })
}



//添加图片
export function addUserimage(query) {
  return request({
    url: '/user/users/addimage',
    method: 'post',
    data: query
  })
}



//删除图片
export function deleteUserimage(query) {
  return request({
    url: '/user/users/deleteImage',
    method: 'post',
    data: query
  })
}




//查询用户跟进记录
export function getFollowUp(query) {
  return request({
    url: '/user/followup/list?userId='+query,
    method: 'get'
  })
}

//新增跟进记录
export function addFollowup(query) {
  return request({
    url: '/user/followup',
    method: 'post',
    data: query
  })
}
//修改跟进记录 
export function editFollowup(query) {
  return request({
    url: '/user/followup',
    method: 'put',
    data: query
  })
}



//获取跟进记录详情
export function getFollowUpDetails(query) {
  return request({
    url: '/user/followup/'+query,
    method: 'get'
  })
}



//用户分配
export function userAllocation(query) {
  return request({
    url: '/user/users/userAllocation',
    method: 'post',
    params: query
  })
}


//获取销售
export function getUserByRole(query) {
  return request({
    url: '/system/user/getUserByRole?roleId='+query,
    method: 'get'
  })
}
































// 新增用户
export function addUsers(data) {
  return request({
    url: '/user/users',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUsers(data) {
  return request({
    url: '/user/users',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUsers(id) {
  return request({
    url: '/user/users/' + id,
    method: 'delete'
  })
}

// 导出用户
export function exportUsers(query) {
  return request({
    url: '/user/users/export',
    method: 'get',
    params: query
  })
}



//生成连接
export function userCreateLink(data) {
  return request({
    url: '/user/users/createLink',
    method: 'post',
    data: data
  })
}
//生成编辑连接
export function userUpdateLink(data) {
  return request({
    url: '/user/users/createUpdateLink',
    method: 'post',
    params: data
  })
}