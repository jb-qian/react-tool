/*
 * @Author: 宋乾
 * @Date: 2019-01-09 18:03:38
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-08 18:37:11
 */
import * as React from 'react';

import * as styles from './less/css.module.less';
import * as border from './less/border.module.less';

import Tool from './component/Tool/Tool';

const {
	Rem,
	Mounted,
	readonly,
} = Tool;

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

import axios from 'axios';

const log = (target: any, name: string, descriptor: any) => {
	let oldValue = descriptor.value;
	descriptor.value = function (text: string) {
		console.log(text, '被弹出');
		return oldValue.call(this, `弹出：${text}`);
	};
	return descriptor;
}

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
	history: any;
}
interface State {
	loading: boolean;
	number: number;
	select: Value[];
	rules: {};
}

interface NameProps {
	number: number;
}

@Mounted
class Text extends React.Component<NameProps> {
	public componentWillUnmount (){
		setTimeout(() => {
			this.setState({
				text: '',
			})
		});
	}
	public render (){
		return (
			<div>{ this.props.number }秒后，我即使被隐藏也不会报错</div>
		)
	}
}

@Mounted
class App extends React.Component<Props, State> {

	@readonly
	public text: string = 'componentWillUnmount调用了setState，但是没报错';

	public timer: NodeJS.Timeout;

	constructor(props: Props){
		super(props)
		this.state = {
			loading: false,
			number: 3,
			select: [{
				value: 0,
				text: '卡车之家',
			},{
				value: 1,
				text: '卡家二手车',
			},{
				value: 2,
				text: '卡家好车',
			}],
			rules: {
				password: (value: string) => {
					if (value.length !== 6) {
						return '请输入6位密码';
					}
					return '';
				}
			}
		}
	}
	public ajax (){
		this.setState({
			loading: true,
		})
		axios.get('/').then(res => {
			this.setState({
				loading: false,
			})
		}).catch(res => {
			this.setState({
				loading: false,
			})
		})
	}
	@log
	public name (text: string){
		Toast({
			text,
		})
	}
	public toast = () => {
		this.name('我是小明')
	}
	public alert = () => {
		Alert({
			subtitle: '我是副标题',
			title: '我是一个alert',
			primary: () => {
				this.props.history.push('/list');
			}
		})
	}
	public onSelectChange = (item: Value[]) => {
		console.log(item);
	}
	public submit = (form: object) => {
		let arr = Object.entries(form).map((item) => {
			return item.join(': ');
		})
		Toast({
			text: arr.join('\n'),
		})
	}
	public input = (key: string, value: string) => {
		console.log(key, value);
	}
	public componentDidMount (){
		this.ajax();
		// 倒计时
		this.timer = setInterval(() => {
			this.setState(prev => {
				let number = prev.number - 1;
				if (number === 0) {
					clearInterval(this.timer);
				}
				return {
					number,
				}
			})
		}, 1000);
		// 修改不能改变的值
		try {
			this.text = '文字被修改';
		} catch (error) {
			console.log('只读属性text不能被改变', error);
		}
	}
	public componentWillUnmount (){
		clearInterval(this.timer);
	}
	public render() {
		let btnStyles = [styles.btn, border.br1].join(' ');
		return (
			<div className={ styles.App } >
				<Button className={ btnStyles } onClick={ this.toast } disabled={ true }>
				{
					!!this.state.number ? <Text number={ this.state.number } /> : this.text
				}
				</Button>
				<Button className={ btnStyles } onClick={ this.toast }>Toast</Button>
				<Button className={ btnStyles } onClick={ this.alert }>Alert</Button>
				<Image className={ styles.image } src={ 'https://img7.kcimg.cn/uploads/c7/4c/c74cd79689721906d4a5831031a5c8e4.jpg' } />
				<Loading loading={ this.state.loading } />
				<Form submit={ this.submit } toast={ Toast } rules={ this.state.rules }>
					<Input
						type={ 'password' }
						maxLength={ 6 }
						name={ 'password' }
						className={ [styles.input, border.br1].join(' ') }
						onInput={ (value: string) => this.input('password', value) }
						placeholder={ '请输入密码' }
						error={ '请输入密码' }
					/>
					<Input
						type={ 'mobile' }
						name={ 'mobile' }
						className={ [styles.input, border.br1].join(' ') }
					/>
					<Select
						data={ this.state.select }
						onConfirm={ this.onSelectChange }
						name={ 'username' }
						className={ [styles.select, border.br1].join(' ') }
						placeholder={ '请选择名称' }
						error={ '请选择名称' }
					/>
					<Date
						begin={ 2008 }
						end={ 2019 }
						onConfirm={ this.onSelectChange }
						name={ 'time' }
						className={ [styles.select, border.br1].join(' ') }
						placeholder={ '请选择时间' }
						error={ '请选择时间' }
					/>
					<Cities
						onConfirm={ this.onSelectChange }
						name={ 'cities' }
						className={ [styles.select, border.br1].join(' ') }
						placeholder={ '请选择城市' }
						error={ '请选择城市' }
					/>
					<Input
						type={ 'textarea' }
						maxLength={ 100 }
						name={ 'textarea' }
						className={ [styles.textarea, border.br1].join(' ') }
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