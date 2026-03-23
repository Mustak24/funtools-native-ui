import { _colors, _theme } from './constance';
import { createStore } from '@funtools/store';
import { Theme } from './types';

const { useStore, useHandlers } = createStore({
  states: {
    theme: _theme,
    colors: _colors[_theme],
    palettes: _colors
  },

  syncHandlers: {
    toggleTheme(state, onToggle?: (theme: Theme) => void) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      state.colors = _colors[state.theme];
      onToggle?.(state.theme);
    },

    updateTheme(state, theme: Theme) {
      state.theme = theme;
      state.colors = _colors[theme];
    }
  },
});

export { useStore as useThemeStore, useHandlers as useThemeHandlers };