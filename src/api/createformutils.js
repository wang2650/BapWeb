const createformutils = {
  GetElementTypes() {
    return [
      { name: '隐藏字段', key: 'hidden' },
      { name: '输入框', key: 'input' },
      { name: '数字输入框', key: 'InputNumber' },
      { name: '自动完成', key: 'autoComplete' },
      { name: '单选按钮', key: 'radio' },
      { name: '多选按钮', key: 'checkbox' },
      { name: '下拉框', key: 'select' },
      { name: '开关', key: 'switch' },
      { name: '多级联动', key: 'cascader' },
      { name: '日期选择器', key: 'DatePicker' },
      { name: '时间选择器', key: 'TimePicker' },
      { name: '颜色选择', key: 'ColorPicker' },
      { name: '上传', key: 'upload' },
      { name: '评分', key: 'rate' },
      { name: '滑块', key: 'slider' },
      { name: '树形', key: 'tree' },
      { name: '框架', key: 'frame' }
    ];
  },
  GetElementText(val) {
    let result = '无';
    switch (val) {
      case 'hidden':
        result = '隐藏字段';
        break;
      case 'input':
        result = '输入框';
        break;
      case 'InputNumber':
        result = '数字输入框';
        break;
      case 'autoComplete':
        result = '自动完成';
        break;
      case 'radio':
        result = '单选按钮';
        break;
      case 'checkbox':
        result = '多选按钮';
        break;
      case 'select':
        result = '下拉框';
        break;
      case 'switch':
        result = '开关';
        break;
      case 'cascader':
        result = '多级联动';
        break;
      case 'DatePicker':
        result = '日期选择器';
        break;
      case 'TimePicker':
        result = '时间选择器';
        break;
      case 'ColorPicker':
        result = '颜色选择';
        break;
      case 'upload':
        result = '上传';
        break;
      case 'rate':
        result = '评分';
        break;
      case 'slider':
        result = '滑块';
        break;
      case 'tree':
        result = '树形';
        break;
      case 'frame':
        result = '框架';
        break;
      default:
        break;
    }

    return result;
  }
};

export default createformutils;
