/*
 * @Author: 宋乾
 * @Date: 2019-01-09 18:03:38
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-19 13:50:10
 */
import * as React from 'react';

import './less/index.less';

import * as styles from './less/css.less';
import * as border from './less/border.less';

import Tool from './component/Tool/Tool';

const { Rem } = Tool;

import Alert from './component/Alert/Alert';
import Toast from './component/Toast/Toast';
import Button from './component/Button/Button';
import Image from './component/Image/Image';
import Loading from './component/Loading/Loading';
import Form from './component/Form/Form';
import Input from './component/Input/Input';
import Select from './component/Select/Select';

import Cities from './Cities';
import Date from './Date';

/**
 * 设计稿750
 * 100px => 1rem
 */
Rem.set();

interface Value{
	text: string;
	value: string | number;
	children?: Value[] | undefined;
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
		this.state = {
			loading: true,
			select: [{
				value: 0,
				text: '卡车之家',
			},{
				value: 1,
				text: '卡家二手车',
			},{
				value: 2,
				text: '卡家好车',
			}]
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
	public onSelectChange = (item: Value[]) => {
		console.log(item);
	}
	public submit = (form:object) => {
		console.log(form);
	}
	public render() {
		let btnStyles = [styles.btn, border.br1].join(' ');
		return (
			<div className={ styles.App } >
				<Button className={ btnStyles } onClick={ this.toast } disabled={ true }>被禁止的按钮</Button>
				<Button className={ btnStyles } onClick={ this.toast }>Toast</Button>
				<Button className={ btnStyles } onClick={ this.alert }>Alert</Button>
				<Image className={ styles.image } src={ 'https://img7.kcimg.cn/uploads/c7/4c/c74cd79689721906d4a5831031a5c8e4.jpg' } />
				<Loading loading={ this.state.loading } />
				<Form submit={ this.submit } toast={ Toast }>
					<Input
						type={ 'password' }
						maxLength={ 10 }
						name={ 'password' }
						className={ styles.input }
						placeholder={ '请输入密码' }
						error={ '请输入密码' }
					/>
					<Select
						data={ this.state.select }
						onConfirm={ this.onSelectChange }
						name={ 'username' }
						className={ styles.select }
						placeholder={ '请选择名称' }
						error={ '请选择名称' }
					/>
					<Date
						begin={ 2008 }
						end={ 2019 }
						onConfirm={ this.onSelectChange }
						name={ 'time' }
						className={ styles.select }
						placeholder={ '请选择时间' }
						error={ '请选择时间' }
					/>
					<Cities
						onConfirm={ this.onSelectChange }
						name={ 'cities' }
						className={ styles.select }
						placeholder={ '请选择城市' }
						error={ '请选择城市' }
					/>
					<Input
						type={ 'textarea' }
						maxLength={ 100 }
						name={ 'textarea' }
						className={ styles.textarea }
						placeholder={ '请输入文字' }
						error={ '请输入文字' }
					/>
					<Button type={ 'submit' } className={ btnStyles }>提交</Button>
				</Form>
			</div>
		);
	}
}

export default App;