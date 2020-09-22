import request from '@/utils/request'


// 查询用户列表
export function listTeacher(query) {
    return request({
      url: '/teacher/list',
      method: 'get',
      data: query
    })
  }

 
        

  export function updateTeacher(query) {
    return request({
      url: '/teacher/edit',
      method: 'post',
      data: query
    })
  }


  export function addTeacher(query) {
    return request({
      url: '/teacher',
      method: 'post',
      data: query
    })
  }

  export function getTeacher(id) {
    return request({
      url: '/teacher/' + id,
      method: 'get'
    })
  }

  export function allocationTeacher(query) {
    return request({
      url: '/teacher/teacherAllocation',
      method: 'post',
      params: query
    })
  }


  export function deleteTeacher(id) {
    return request({
      url: '/teacher/' + id,
      method: 'delete'
    })
  }




  export function listChinaCity(query) {
    return request({
      url: '/user/district/list',
      method: 'get',
      params: query
    })
  }


//新增渠道老师跟进记录
  export function addTeacherFollowUp(query) {
    return request({
      url: '/teacher/followup',
      method: 'post',
      data: query
    })
  }

//查询渠道老师跟进记录列表
export function getTeacherFollowUpList(query) {
  return request({
    url: '/teacher/followup/list',
    method: 'get',
    params: query
  })
}


//获取渠道老师跟进记录详细信息
export function getTeacherFollowUp(id) {
  return request({
    url: '/teacher/followup/' + id,
    method: 'get'
  })
}

//修改渠道老师跟进记录
export function editTeacherFollowUp(query) {
  return request({
    url: '/teacher/followup/edit',
    method: 'post',
    data: query
  })
}

//删除渠道老师跟进记录
export function deleteTeacherFollowUp(id) {
  return request({
    url: '/teacher/followup/'+id,
    method: 'delete',
  })
}