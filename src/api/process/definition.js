import request from '@/utils/request';


export function listDefinition(query) {
    return request({
        url: '/process/definition/list',
        method: 'post',
        params: query
    })
}

export function definitionUpload(query) {
    return request({
        url: '/process/definition/upload',
        method: 'post',
        params: query
    })
}

export function definitionDel(query) {
    return request({
        url: '/process/definition/remove',
        method: 'post',
        params: query
    })
}
