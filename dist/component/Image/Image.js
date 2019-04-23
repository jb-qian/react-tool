/*
 * @Author: 宋乾
 * @Date: 2019-01-17 15:03:47
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-20 09:48:49
 */
import * as React from 'react';
import * as styles from '../../less/image.module.less.js';
export default class MyImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {},
            src: this.props.defaultSrc || '',
        };
    }
    componentDidMount() {
        const src = this.props.src;
        const box = this.image || {};
        const image = new Image();
        image.src = src;
        image.onload = () => {
            let { width, height } = image;
            const { offsetWidth, offsetHeight } = box;
            const imgSize = width / height;
            const boxSize = offsetWidth / offsetHeight;
            // 通过比例算出 需要设置的宽高
            let style = {};
            if (imgSize > boxSize) {
                width = -((offsetHeight / height) * width) / 2;
                style = {
                    top: '0',
                    left: '50%',
                    width: 'auto',
                    height: '100%',
                    marginLeft: `${width}px`,
                };
            }
            else {
                height = -((offsetWidth / width) * height) / 2;
                style = {
                    left: '0',
                    top: '50%',
                    width: '100%',
                    height: 'auto',
                    marginTop: `${height}px`,
                };
            }
            this.setState({
                style,
                src,
            });
            this.props.onSuccess && this.props.onSuccess();
        };
        image.onerror = (e) => {
            this.props.onError && this.props.onError(e);
        };
    }
    render() {
        let className = [styles.imageBox, this.props.className].filter(item => item);
        return (React.createElement("div", { ref: e => this.image = e, className: className.join(' ') },
            React.createElement("img", { className: styles.image, style: this.state.style, src: this.state.src, alt: this.props.alt })));
    }
}
