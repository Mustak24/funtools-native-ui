import { createStore } from '@funtools/store';
import { _colors, _theme } from './constance';


export type Theme = 'light' | 'dark';

export type ColorState = 
    'text' |  'text-secondary'
    | 'bg' | 'bg-secondary'
    | 'border'
    | 'primary'
    | 'error'
    | 'info'
    | 'warning'
    | 'success'
;


const { useStore, useHandlers } = createStore({
  states: {
    theme: _theme,
    colors: _colors[_theme],
    palettes: _colors
  },

  syncHandlers: {
    toggleTheme({states}, theme?: Theme) {
      states.theme = theme ?? states.theme === 'dark' ? 'light' : 'dark';
      states.colors = _colors[states.theme];
    },

    updateColors({states, handlers}, { theme, colors }: {theme: Theme, colors: Partial<typeof _colors[Theme]>}) {
      handlers.palettes.updateMany({
        [theme]: colors
      })

      if(states.theme === theme) {
        handlers.colors.updateMany(colors);
      }
    }
  },
});

export { useStore as useThemeStore, useHandlers as useThemeHandlers };