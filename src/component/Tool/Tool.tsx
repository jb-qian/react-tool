/*
 * @Author: 宋乾
 * @Date: 2019-01-18 14:59:31
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-06 18:59:43
 */

const PX = (size: number = 750) => {
    // 获取htnml
    let html = document.documentElement;
    // 获取宽度
    let width = html.clientWidth;
    // 计算px值
    let px = width / size * 100;
    // 返回px值
    return { html, px };
}

const Rem = {
    set: (size: number = 750) => {
        let { html, px } = PX(size);
        // 设置html字体大小
        html.setAttribute('style', `font-size: ${px}px !important`);
    },
    get: (size: number = 750) => {
        let { px } = PX(size);
        // 返回px值
        return px;
    }
}

// 组件被销毁后阻止数据改变
function Mounted(target: Function) {
    const _target = target.prototype;
    
	const {
		componentDidMount,
        componentWillUnmount,
		setState,
    } = _target;

    let _isMounted = false;

    
	_target.componentDidMount = function (){
        componentDidMount && componentDidMount.call(this);
		_isMounted = true;
    }
    
	_target.componentWillUnmount = function (){
		componentWillUnmount && componentWillUnmount.call(this);
        _isMounted = false;
	}

	_target.setState = function (){
		if (_isMounted) {
			setState.apply(this, arguments);
		}
    }
}

// 只读
function readonly(...args: any) {
    let descriptor = args[2];
    descriptor.writable = false;
    return descriptor;
}

export default {
    Rem,
    PX,
    Mounted,
    readonly,
};