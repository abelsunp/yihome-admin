import request from '@/utils/request'

// 查询房源列表
export function listHouse(query) {
  return request({
    url: '/home/house/searchHouse',
    method: 'post',
    data: query,
  })
}
//没有权限的查询房源
export function listHouseOnly(query) {
  return request({
    url: '/home/house/searchOnlyHouse',
    method: 'post',
    data: query,
  })
}

//第一步房源新增
export function addHouseAPI(query) {
  return request({
    url: '/home/house/add',
    method: 'post',
    data: query,
  })
}

//第一步房源编辑
export function editHouseAPI(query) {
  return request({
    url: '/home/house/edit',
    method: 'post',
    data: query,
  })
}


//第二步房源所有标签信息
export function labelHouseAPI(query) {
  return request({
    url: '/home/house/getAllLableInfo',
    method: 'post',
    data: query,
  })
}

//第二步查询所选中的标签
export function checkLabelHouseAPI(query) {
  return request({
    url: '/home/house/getAllLableInfoCheck?houseId=' + query,
    method: 'get',
    //data: query,
  })
}



//第二步保存用户所选中的标签
export function insertHouseLabel(query) {
  return request({
    url: '/home/house/insertHouseLabel',
    method: 'post',
    data: query,
  })
}

//第三步新增图片
export function insertHouseImage(query) {
  return request({
    url: '/home/house/insertHouseImage',
    method: 'post',
    data: query,
  })
}
//第三步删除图片
export function delelteHouseImage(query) {
  return request({
    url: '/home/house/delelteHouseImage?id='+query,
    method: 'get',
  })
}



//
export function getHouseDetail(query) {
  return request({
    url: '/home/house/getHouseDetail?houseId='+query,
    method: 'get',
  })
}




// 查询单间列表 houseId
export function listRoom(query) {
  return request({
    url: '/home/room/searchRoomManyLabel',
    method: 'post',
    data: query,
  })
}


//房源复制
export function houseCopyMethod(query) {
  return request({
    url: '/home/house/copy?id='+query,
    method: 'post',
    //data: query,
  })
}
/**
 * 房源状态
 * 
 */
//废弃
export function houseGiveUp(query) {
  return request({
    url: '/home/house/updateStatusGiveUp',
    method: 'post',
    data: query,
  })
}
//上架
export function housePutaway(query) {
  return request({
    url: '/home/house/updateStatusPutaway',
    method: 'post',
    data: query,
  })
}

//下架
export function houseSoldOut(query) {
  return request({
    url: '/home/house/updateStatusSoldOut',
    method: 'post',
    data: query,
  })
}

//售罄
export function houseSellOut(query) {
  return request({
    url: '/home/house/updateStatusSellOut',
    method: 'post',
    data: query,
  })
}





export function useListGetHouse(query) {
  return request({
    url: '/home/house/list',
    method: 'post',
    data: query,
  })
}





//新增简单房源
export function insertSimpleHouse(query) {
  return request({
    url: '/home/house/insertSimpleHouse',
    method: 'post',
    data: query,
  })
}