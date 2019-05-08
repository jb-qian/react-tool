import * as React from 'react'

interface Props{
    data: any[];
    rowRenderer: <T>(item: T, index: number) => JSX.Element;
    onScroll?: () => void;
    isScrollToPageBottom?: (callback: () => void) => void;
    onEndReachedThreshold: number;
}

export default class ListView extends React.Component<Props>{

    static defaultProps = {
        // 距离底部最低值
        onEndReachedThreshold: 20,
    }

    // 滚动锁
    public isScrollToPageBottomLock: boolean = false;

    public scroll = () => {
        if (this.isScrollToPageBottom()) {
            if (!this.isScrollToPageBottomLock) {
                this.isScrollToPageBottomLock = true;
                if (this.props.isScrollToPageBottom) {
                    this.props.isScrollToPageBottom(() => {
                        this.isScrollToPageBottomLock = false;
                    });
                }else{
                    this.isScrollToPageBottomLock = false;
                }
            }
        }
    }
    public isScrollToPageBottom = () => {
        let { documentHeight, viewPortHeight, scrollTop } = this.getViewportSize();
        return documentHeight - viewPortHeight - scrollTop < this.props.onEndReachedThreshold;
    }
    public getViewportSize = () => {
        let w = window;
        let d = document;
        return {
            // 获取内容高度
            documentHeight: d.documentElement.offsetHeight,
            // 获取可视区高度
            viewPortHeight: w.innerHeight || d.documentElement.clientHeight || d.body.clientHeight,
            // 获取滚动位置
            scrollTop: d.documentElement.scrollTop || d.body.scrollTop || w.pageYOffset,
        }
    }
    public componentDidMount (){
        document.addEventListener('scroll', this.scroll);
    }
    public componentWillUnmount (){
        document.removeEventListener('scroll', this.scroll);
    }
    public render (){
        return (
            <div>
                {
                    this.props.data.map((item, index) => {
                        return this.props.rowRenderer(item, index);
                    })
                }
            </div>
        )
    }
}