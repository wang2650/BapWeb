
import service from '@/api/request'
import utils from '@/api/utils'
//插入字典
export function InsertDict(dataValue) {
    return service({
        url: '/Api/Configmanage/Dict/InsertDict',
        method: 'post',
        data: dataValue
    })
}
//更新字典
export function UpdateDict(dataValue) {
    return service({
        url: '/Api/Configmanage/Dict/UpdateDict',
        method: 'post',
        data: dataValue
    })
}
//删除字典
export function DeleteDictByDictId(dataValue) {
    return service({
        url: '/Api/Configmanage/Dict/DeleteDictByDictId' + utils.queryParams(dataValue),
        method: 'get',
        data: ''
    })
}
//删除字典通过组名
export function DeleteDictByGroupName(dataValue) {
    return service({
        url: '/Api/Configmanage/Dict/DeleteDictByGroupName' + utils.queryParams(dataValue),
        method: 'get',
        data: ''
    })
}
//获取字典列表
export function GetDictList(dataValue) {
    return service({
        url: '/Api/Configmanage/Dict/GetDictList',
        method: 'post',
        data: dataValue
    })
}

//获取字段组集合
export function GetGroupList(dataValue) {
    return service({
        url: '/Api/Configmanage/Dict/GetGroupList',
        method: 'post',
        data: dataValue
    })
}