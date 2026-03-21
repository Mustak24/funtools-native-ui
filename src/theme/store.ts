import { _colors, _theme } from './constance';
import { createStore } from '@funtools/store';
import { Theme } from './types';

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
    }
  },
});

export { useStore as useThemeStore, useHandlers as useThemeHandlers };