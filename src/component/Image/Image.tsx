import * as React from 'react';

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
            if (imgSize > boxSize) {
                width = -((offsetHeight / height) * width) / 2;
                this.setState({
                    style: {
                        top: '0',
                        left: '50%',
                        width: 'auto',
                        height: '100%',
                        marginLeft: `${width}px`,
                    },
                    src,
                })
            }else{
                height = -((offsetWidth / width) * height) / 2;
                this.setState({
                    style: {
                        left: '0',
                        top: '50%',
                        width: '100%',
                        height: 'auto',
                        marginTop: `${height}px`,
                    },
                    src,
                })
            }
            this.props.onSuccess && this.props.onSuccess();
        }
        image.onerror = (e) => {
            this.props.onError && this.props.onError(e);
        }
    }
    public render (){
        return (
            <div ref={ e => this.image = e } className={ `sq-image-box ${this.props.className || ''}` }>
                <img className={ `sq-image` } style={ this.state.style } src={ this.state.src } alt={ this.props.alt }/>
            </div>
        )
    }
}