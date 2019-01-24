/*
 * @Author: 宋乾
 * @Date: 2019-01-09 18:03:38
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-01-24 17:52:21
 */
import * as React from 'react';

import './less/index.less';
import { rem } from './component/Tool/Tool';

import Alert from './component/Alert/Alert';
import Toast from './component/Toast/Toast';
import Button from './component/Button/Button';
import Image from './component/Image/Image';
import Loading from './component/Loading/Loading';
import Form from './component/Form/Form';
import Input from './component/Input/Input';

/**
 * 设计稿750
 * 100px => 1rem
 */
rem(750).set();

interface Props {
	app?: boolean;
}
interface State {
	loading: boolean;
}

class App extends React.Component<Props, State> {
	constructor(props: Props){
		super(props)
		this.state = {
			loading: true,
		}
	}
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
	public componentDidMount (){
		setTimeout(() => {
			this.setState({
				loading: false,
			})
		}, 1000);
	}
	/**
	 * submit
	 */
	public submit = (form:object) => {
		console.log(form);
	}
	public render() {
		return (
			<div className="App" >
				<Button className={ 'my-btn br1' } onClick={ this.toast } disabled={ true }>被禁止的按钮</Button>
				<Button className={ 'my-btn br1' } onClick={ this.toast }>Toast</Button>
				<Button className={ 'my-btn br1' } onClick={ this.alert }>Alert</Button>
				<Image className={ 'my-image' } src={ 'https://img7.kcimg.cn/uploads/c7/4c/c74cd79689721906d4a5831031a5c8e4.jpg' } />
				<Loading loading={ this.state.loading } />
				<Form submit={ this.submit }>
					<Input type={ 'password' } maxLength={ 11 } name={ 'password' } className={ 'my-input' } placeholder={ '请输入密码' } />
					<select name="select" className="my-select">
						<option value="0">0</option>
						<option value="1">1</option>
					</select>
					<Input textarea={ true } maxLength={ 11 } name={ 'textarea' } className={ 'my-textarea' } placeholder={ '请输入密码' } />
					<Button type={ 'submit' } className={ 'my-btn br1' }>提交</Button>
				</Form>
			</div>
		);
	}
}

export default App;