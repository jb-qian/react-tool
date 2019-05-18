import {
	combineReducers
} from 'redux'

interface Action {
	type: string;
}
const number = (state: number = 10000, action: Action) => {
	switch (action.type) {
		case 'add':
			return state += 100;
		case 'remove':
			return state -= 100;
		case 'ajax':
			return state -= 1000;
		default:
			return state;
	}
}

const name = (state: string = '宋乾', action: Action) => {
	switch (action.type) {
		case 'change':
			return state = '宋乾爸爸';
		default:
			return state;
	}
}

export default combineReducers({
	number,
	name,
})