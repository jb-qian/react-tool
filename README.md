# react-tool 组件库

<a href="https://www.npmjs.com/package/cat-react-tool"><img alt="npm version" src="http://img.shields.io/npm/v/cat-react-tool.svg?style=flat-square"></a>
<a href="https://www.npmjs.com/package/cat-react-tool"><img alt="npm version" src="http://img.shields.io/npm/dm/cat-react-tool.svg?style=flat-square"></a>

## 工具列表123

* [Button 按钮](#button)
* [Toast 提示](#toast)
* [Alert 弹出窗口](#alert)
* [Loading 加载动画](#loading)
* [Image 图片](#image)
* [Select 选择器](#select)
* [Input 输入框](#input)
* [Form 表单](#form)
* [Tool 工具](#tool)

[Demo](https://jb-qian.github.io/react-tool/build/) (**组件不包括UI样式**)

## <a name="button">Button 按钮</a>
```
<Button
    className={ 'my-btn br1' }
    onClick={ this.onClick }
    disabled={ false }
>我是一个按钮</Button>
```
属性 | 说明 | 类型 | 默认值
 ---- | ----- | ------ | ------
 disabled? | 是否禁止点击 | boolean | 无
 onClick? | 点击触发 | () => void | 无
 className? | 样式名 | string | 无
 style? | style | React.CSSProperties | 无
 type? | html的type | string | 无

---------------------------------------------------------------------

## <a name="toast">Toast 提示</a>
```
Toast({
    duration: 3000,
    text: '我是一个3秒的toast',
})
```
属性 | 说明 | 类型 | 默认值
 ---- | ----- | ------ | ------
 text | 提示文字 | string | 无
 duration? | 持续时间 | number | 3000
 
 ---------------------------------------------------------------------
 
 ## <a name="alert">Alert 弹出窗口</a>
```
Alert({
    subtitle: '我是副标题',
    title: '我是一个alert',
})
```
属性 | 说明 | 类型 | 默认值
 ---- | ----- | ------ | ------
 title | 提示标题 | string | 无
 subtitle? | 提示内容 | string | 无
 noDefault? | 设置没有取消按钮 | boolean | false
 noPrimary? | 设置没有确定按钮 | boolean | false
 default? | 点击取消时调用 | () => void | 无
 primary? | 点击确定时调用 | () => void | 无
 
 ---------------------------------------------------------------------
 
 ## <a name="loading">Loading 加载动画</a>
 ```
 <Loading
    loading={ true }
 />
 ```
 属性 | 说明 | 类型 | 默认值
 ---- | ----- | ------ | ------
 loading | loading状态 | boolean | false
 text? | 文字内容 | string | 加载中
 
 ---------------------------------------------------------------------
 
  ## <a name="image">Image 图片</a>
 ```
 <Image
    className={ 'my-image' }
    src={ 'https://img7.kcimg.cn/uploads/c7/4c/c74cd79689721906d4a5831031a5c8e4.jpg' }
    alt={ '图片' }
 />
 ```
 属性 | 说明 | 类型 | 默认值
 ---- | ----- | ------ | ------
 src | 显示图片地址 | string | 无
 alt? | 图片文案 | string | 无
 className? | 样式名称 | string | 无
 defaultSrc? | 默认图片地址 | string | 无
 onSuccess? | 成功加载的回调 | () => void | 无
 onError? | 错误加载的回调 | (e: any) => void | 无
 
 ---------------------------------------------------------------------

## <a name="select">Select 选择器</a>
```
// 数据
let data = [{
    value: 0,
    text: '选项1',
    children: [{
        value: 0,
        text: '选项1-1',
    },{
        value: 1,
        text: '选项1-2',
    }]
},{
    value: 1,
    text: '选项2',
    children: [{
        value: 0,
        text: '选项2-1',
    },{
        value: 1,
        text: '选项2-2',
    }]
}]
<Select
    data={ data }
    onConfirm={ this.onConfirm }
    name={ 'username' }
    className={ 'my-select' }
    placeholder={ '请选择名称' }
    length={ 2 }
    error={ '请选择名称' }
/>
```
举例：
[时间选择器](https://github.com/jb-qian/react-tool/blob/master/src/Date.tsx)、
[城市选择器](https://github.com/jb-qian/react-tool/blob/master/src/Cities.tsx)
```
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
 placeholder? | 未选择默认文案 | string | 请选择
 defaultValue? | 默认选项 | Value | 无
 className? | 样式名称 | string | 无
 length? | 选择器数量 | number | 1
 type? | 选择器类型，可选 'date' | string | 无
 error? | 错误提示，配合form表单使用，如果设置此项，在form中表示必填 | string | 无
 
 ---------------------------------------------------------------------
 
 ## <a name="input">Input 输入框</a>
 ```
 <Input
    type={ 'password' }
    maxLength={ 10 }
    name={ 'password' }
    className={ 'my-input' }
    placeholder={ '请输入密码' }
    error={ '请输入密码' }
/>
 ```
 属性 | 说明 | 类型 | 默认值
 ---- | ----- | ------ | ------
 name | input的name属性 | string | 无
 type? | input的type属性，若设置为 textarea 则为 textarea元素 | string | 无
 maxLength? | input的maxLength属性 | number | 无
 className? | 样式名 | string | 无
 style? | style | React.CSSProperties | 无
 placeholder? | 默认文案 | string | 无
 onInput | oninput事件 | (e) => void | 无
 onChange | onchange事件 | (e) => void | 无
 error? | 错误提示，配合form表单使用，如果设置此项，在form中表示必填 | string | 无
 
 ---------------------------------------------------------------------
 
 ## <a name="form">Form 表单</a>
 ```
 <Form submit={ this.submit } toast={ Toast }>
    <Input
        type={ 'password' }
        maxLength={ 10 }
        name={ 'password' }
        className={ 'my-input' }
        placeholder={ '请输入密码' }
        error={ '请输入密码' }
    />
    <Date
        begin={ 2008 }
        end={ 2019 }
        onConfirm={ this.onConfirm }
        name={ 'time' }
        className={ 'my-select' }
        placeholder={ '请选择时间' }
        error={ '请选择时间' }
    />
    <Input
        type={ 'textarea' }
        maxLength={ 100 }
        name={ 'textarea' }
        className={ 'my-textarea' }
        placeholder={ '请输入文字' }
        error={ '请输入文字' }
    />
    <Button type={ 'submit' } className={ 'my-btn br1' }>提交</Button>
</Form>
 ```
 属性 | 说明 | 类型 | 默认值
 ---- | ----- | ------ | ------
 submit? | 提交表单 返回表单内input、select、textarea等原生html元素的json对象，例：{password: 123, textarea: 666} | (json:object) => void | 无
 toast? | 提示器 | any | 无
  
 ---------------------------------------------------------------------

 ## <a name="tool">Tool 工具</a>
 ```
 Rem.set(750); 设置html font-size 以设计稿750为基准 1rem == 100px
 Rem.get(750); 返回 以750为基准的像素值
 ```
 
