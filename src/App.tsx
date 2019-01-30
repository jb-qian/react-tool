/*
 * @Author: 宋乾
 * @Date: 2019-01-09 18:03:38
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-01-30 11:16:57
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
import Select from './component/Select/Select';

/**
 * 设计稿750
 * 100px => 1rem
 */
rem(750).set();

interface Value{
	text: string;
	value: string | number;
}

interface Props {
	app?: boolean;
}
interface State {
	loading: boolean;
	select: Value[];
}

class App extends React.Component<Props, State> {
	constructor(props: Props){
		super(props)
		let select = [];
		for (let i = 0; i < 30; i++) {
			select.push({
				text: `我是option${i}`,
				value: i,
			})
		}
		this.state = {
			loading: true,
			select,
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
	public onSelectChange = (item:Value) => {
		console.log(item);
	}
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
					<Input
						type={ 'password' }
						maxLength={ 11 }
						name={ 'password' }
						className={ 'my-input' }
						placeholder={ '请输入密码' }
					/>
					<Select
						data={ this.state.select }
						onChange={ this.onSelectChange }
						name={ 'select' }
						className={ 'my-select' }
						defaultValue={ this.state.select[0] }
					/>
					<Input
						textarea={ true }
						maxLength={ 11 }
						name={ 'textarea' }
						className={ 'my-textarea' }
						placeholder={ '请输入密码' }
					/>
					<Button type={ 'submit' } className={ 'my-btn br1' }>提交</Button>
				</Form>
			</div>
		);
	}
}

export default App;