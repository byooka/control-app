export const CHANGE_THEME = 'change_theme'

export type ThemeType = "light" | "dark"

interface ChangeThemeAction {
	type: typeof CHANGE_THEME
	payload: ThemeType
}

export type ThemeActionTypes = ChangeThemeAction

export const changeThemeActionCreator = (theme: ThemeType): ChangeThemeAction => {
	return {
		type: CHANGE_THEME,
		payload: theme
	}
}
