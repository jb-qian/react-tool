/*
 * @Author: 宋乾
 * @Date: 2019-01-09 18:03:38
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-01-18 16:56:52
 */
import * as React from 'react';

import './less/index.less';
import { rem } from './component/Tool/Tool';

import Alert from './component/Alert/Alert';
import Toast from './component/Toast/Toast';
import Button from './component/Button/Button';
import Image from './component/Image/Image';
import Loading from './component/Loading/Loading';

/**
 * 设计稿750
 * 100px => 1rem
 */
rem(750).set();

class App extends React.Component {
	public toast = () => {
		Toast({
			duration: 3000,
			text: '我是一个3秒的toast',
		})
	}
	public alert = () => {
		Alert({
			subtitle: '我是副标题',
			title: '我是一个alert',
		})
	}
	public render() {
		return (
			<div className="App" >
				<Button className={ 'my-btn br1' } onClick={ this.toast } disabled={ true }>被禁止的按钮</Button>
				<Button className={ 'my-btn br1' } onClick={ this.toast }>Toast</Button>
				<Button className={ 'my-btn br1' } onClick={ this.alert }>Alert</Button>
				<Image className={ 'my-image' } src={ 'https://user-gold-cdn.xitu.io/2019/1/16/16855083bbe0082c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1' } />
				<Image className={ 'my-image' } src={ 'https://img7.kcimg.cn/uploads/c7/4c/c74cd79689721906d4a5831031a5c8e4.jpg' } />
				<Loading />
			</div>
		);
	}
}

export default App;