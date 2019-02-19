# react-tool 组件库

react工具集合

[demo](https://jb-qian.github.io/react-tool/build/) 

**组件不包括UI样式**

持续更新

```
// 数据
let data = [{
    value: 0,
    text: '选项1',
},{
    value: 1,
    text: '选项2',
}]
// 选择器
<Select
    data={ data }
    onConfirm={ this.onConfirm }
    name={ 'username' }
    className={ 'my-select' }
    placeholder={ '请选择名称' }
    error={ '请选择名称' }
/>

// 接口
interface Value {
    text: string;
    value: string | number;
    children?: Value[] | undefined;
}
```
 属性 | 说明 | 类型 | 默认值
 ---- | ----- | ------ | ------
 data | 选择器数据 | Value[] | []
 name | select的name属性 | string | 无
 onChange? | 选择器改变后触发 | (item: Value[]) => void | 无
 onConfirm? | 确认按钮触发 | (item: Value[]) => void | 无
 placeholder? | 未选择默认文案 | string | 无
 defaultValue? | 默认选项 | Value | 无
 className? | 样式名称 | string | 无
 length? | 选择器数量 | number | 1
 type? | 选择器类型，可选 'date' | string | 无
 error? | 错误提示，配合form表单使用，如果设置此项，在form中表示必填 | string | 无
