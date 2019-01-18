/*
 * @Author: 宋乾
 * @Date: 2019-01-17 15:03:47
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-01-18 15:44:10
 */
import * as React from 'react';

/**
 * @param
 * src 图片地址
 * alt 图片简介
 * className 样式名称
 * defaultSrc 默认地址，图片未load成功或失败时显示
 * onSuccess load成功后调用
 * onError load失败后显示
 */
interface Props {
    src: string;
    alt?: string;
    className?: string;
    defaultSrc?: string;
    onSuccess?: () => void;
    onError?: (e:any) => void;
}
interface State {
    style: object;
    src: string;
}

export default class MyImage extends React.Component<Props, State> {

    public image: any;

    constructor (props:Props){
        super(props)
        this.state = {
            style: {},
            src: this.props.defaultSrc || '',
        }
    }

    public componentDidMount (){
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
                }
            }else{
                height = -((offsetWidth / width) * height) / 2;
                style = {
                    left: '0',
                    top: '50%',
                    width: '100%',
                    height: 'auto',
                    marginTop: `${height}px`,
                }
            }
            this.setState({
                style,
                src,
            })
            this.props.onSuccess && this.props.onSuccess();
        }
        image.onerror = (e) => {
            this.props.onError && this.props.onError(e);
        }
    }
    public render (){
        let className = ['sq-image-box', this.props.className].filter(item => item);
        return (
            <div ref={ e => this.image = e } className={ className.join(' ') }>
                <img className={ `sq-image` } style={ this.state.style } src={ this.state.src } alt={ this.props.alt }/>
            </div>
        )
    }
}