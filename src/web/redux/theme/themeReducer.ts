
import { CHANGE_THEME, ThemeActionTypes, ThemeType } from './themeActions'

export interface LanguageState {
	theme: ThemeType
}

const defaultState: LanguageState = {
	theme: 'light',
}

export default (state = defaultState, action: ThemeActionTypes) => {
	switch (action.type) {
		case CHANGE_THEME:
			return { ...state, theme: action.payload }
		default:
			return state
	}
}
