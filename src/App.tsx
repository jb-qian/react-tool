import * as React from 'react';

import '../src/less/border.less';

import Alert from './component/Alert/Alert';
import Toast from './component/Toast/Toast';
import Button from './component/Button/Button';

class App extends React.Component {
	public toast = () => {
		Toast({
			duration: 3000,
			text: '我是一个toast',
		})
	}
	public alert = () => {
		Alert({
			title: '我是一个alert',
		})
	}
	public render() {
		return (
			<div className="App" >
				<Button onClick={ this.toast } disabled={ true }>toast</Button>
				<Button onClick={ this.alert }>alert</Button>
			</div>
		);
	}
}

export default App;