import request from '@/utils/request';

//第一步 新增单间基础信息
export function addRoomAPI(query) {
    return request({
      url: '/home/room/add',
      method: 'post',
      data: query,
    })
}

//第一步 编辑单间基础信息
export function editRoomAPI(query) {
    return request({
      url: '/home/room/edit',
      method: 'post',
      data: query,
    })
}


//获取单间的详细信息
export function getInfoById(query) {
  return request({
    url: '/home/room/getInfoById?roomId=' + query,
    method: 'get',
    //data: query,
  })
}


//新增图片
export function insertRoomImage(query) {
  return request({
    url: '/home/room/insertRoomImage',
    method: 'post',
    data: query,
  })
}
export function delelteRoomImage(query) {
  return request({
    url: '/home/room/delelteRoomImage?id='+query,
    method: 'get',
  })
}


//新增租期
export function insertRoomLeaseperiod(query) {
  return request({
    url: '/home/room/insertRoomLeaseperiod',
    method: 'post',
    data: query,
  })
}
//删除租期
export function deleteRoomLeaseperiod(query) {
  return request({
    url: '/home/room/deleteRoomLeaseperiod?leaseperiodId='+query,
    method: 'get',
  })
}
//编辑租期
export function editRoomLeaseperiod(query) {
  return request({
    url: '/home/room/editRoomLeaseperiod',
    method: 'post',
    data: query,
  })
}

//上架
export function roomPutaway(query) {
  return request({
    url: '/home/room/updateStatusPutaway',
    method: 'post',
    data: query,
  })
}
//下架
export function roomSoldOut(query) {
  return request({
    url: '/home/room/updateStatusSoldOut',
    method: 'post',
    data: query,
  })
}
//废弃
export function roomGiveUp(query) {
  return request({
    url: '/home/room/updateStatusGiveUp',
    method: 'post',
    data: query,
  })
}



//新增格式化租期
export function addLeaseperiod(query) {
  return request({
    url: '/home/leaseperiod',
    method: 'post',
    data: query,
  })
}

//获取格式化租期详细信息
export function getLeaseperiod(id) {
  return request({
    url: `/home/leaseperiod/${id}`,
    method: 'get',
  })
}

//删除格式化租期
export function delLeaseperiod(id) {
  return request({
    url: `/home/leaseperiod/${id}`,
    method: 'delete',
  })
}

//修改格式化租期
export function editLeaseperiod(query) {
  return request({
    url: '/home/leaseperiod/edit',
    method: 'post',
    data: query,
  })
}

// 查询格式化租期列表
export function getListLeaseperiod(query) {
  return request({
    url: '/home/leaseperiod/list',
    method: 'get',
    params: query,
  })
}
