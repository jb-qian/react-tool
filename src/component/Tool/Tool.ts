/*
 * @Author: 宋乾
 * @Date: 2019-01-18 14:59:31
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-01-18 15:42:42
 */
export const rem = (size: number) => {
    // 获取htnml
    let html:HTMLElement = document.documentElement;
    // 读取html宽度
    let w:number = html.clientWidth;
    // 计算出作为rem基础的单位大小
    let px:number = w / size * 100;
    return {
        // 设置html字体
        set: () => {
            html.setAttribute('style', `font-size: ${px}px !important`);
        },
        // 返回字体
        get: () => {
            return px;
        }
    }
}