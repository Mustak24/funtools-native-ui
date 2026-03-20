import { _colors, _theme } from './constance';
import { createStore } from '@funtools/store';
import { Color, ColorState, Theme } from './types';

const { useStore, useHandlers } = createStore({
  states: {
    theme: _theme,
    colors: _colors[_theme],
  },

  syncHandlers: {
    toggleTheme(state, onToggle?: (theme: Theme) => void) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      state.colors = _colors[state.theme];
      onToggle?.(state.theme);
    },

    updateTheme(state, theme: Theme) {
      state.theme = theme;
    },

    updateThemeColor(state, color: ColorState, val: [r: number, g: number, b: number]) {
      state.colors = {
        ...state.colors,
        [color]: val.join(', ') as Color,
      };
    }
  },
});

export { useStore as useThemeStore, useHandlers as useThemeHandlers };