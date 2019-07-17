//  状态数组   includeall是否包含全部
export function statelist(includeall) {
   let list= [
    { value: 1, name: '正常',key:'normal' },
    { value: 2, name: '删除' ,key:'delete'},
    { value: 3, name: '停用' ,key:'stop'}
  ]
   includeall = arguments[0] ? arguments[0] : false;//设置参数includeall的默认值为false
  if(includeall){
    list.push({value: 0, name: '全部' ,key:'all'});
  }
  return list ;


}

export function stateText(val) {
  let result = '正常';
  switch (val) {
    case 0:
      result = '全部';
      break;
    case 1:
      result = '正常';
      break;
    case 2:
      result = '删除';
      break;
    case 3:
      result = '停用';
      break;
    default:
      break;
  }

  return result;
}
///性别列表
export function sexlist(includeall) {
 let list= [
    { value: 3, name: '未知',key:'unknow' },
    { value: 1, name: '男',key:'man' },
    { value: 2, name: '女' ,key:'woman'}
  ];
  includeall = arguments[0] ? arguments[0] : false;//设置参数includeall的默认值为false
  if(includeall){
    list.push( { value: 0, name: '全部' ,key:'all'});
  }
  return list;
}
export function sexText(val) {
  let result = '未知';
  switch (val) {
    case 0:
      result = '全部';
      break;
    case 1:
      result = '男';
      break;
    case 3:
      result = '未知';
      break;
    case 2:
      result = '女';
      break;
    default:
      break;
  }

  return result;
}

export function yesornolist(includeall) {
  let list= [
    { value: 1, name: '是',key:'yes' },
    { value: 2, name: '否' ,key:'no'}
  ];
  includeall = arguments[0] ? arguments[0] : false;//设置参数includeall的默认值为false
  if(includeall){
    list.push( { value: 0, name: '全部' ,key:'all'});
  }
  return
}
export function yesornoText(val) {
  let result = '未知';
  switch (val) {
    case 0:
      result = '全部';
      break;
    case 1:
      result = '是';
      break;
    case 2:
      result = '否';
      break;
    default:
      break;
  }

  return result;
}