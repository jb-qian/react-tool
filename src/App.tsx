import * as React from 'react';
import './App.css';

import Toast from './component/Toast';

class App extends React.Component {
	public render() {
		return (
			<div className="App">
				<Toast />
			</div>
		);
	}
}

export default App;