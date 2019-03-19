/*
 * @Author: 宋乾
 * @Date: 2019-01-18 14:59:31
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-19 13:49:46
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

class Rem {
    public static set = (size: number = 750) => {
        let { html, px } = PX(size);
        // 设置html字体大小
        html.setAttribute('style', `font-size: ${px}px !important`);
    }
    public static get = (size: number = 750) => {
        let { px } = PX(size);
        // 返回px值
        return px;
    }
}

export default {
    Rem,
};