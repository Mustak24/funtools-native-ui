import { Theme, ColorStates, ColorStateNames, ColorShades } from './types';

export const _theme: Theme = 'light';

export const _colors: Record<Theme, Record<ColorStates, string>> = {
  light: {
    ...getColors('text', '15, 23, 42'),
    ...getColors('text-secondary', '100, 116, 139'),
    ...getColors('textSecondary', '100, 116, 139'),

    ...getColors('bg', '220, 220, 255'),
    ...getColors('bg-secondary', '255, 255, 255'),
    ...getColors('bgSecondary', '255, 255, 255'),

    ...getColors('border', '226, 232, 240'),

    ...getColors('primary', '59, 130, 246'),
    ...getColors('error', '239, 68, 68'),
    ...getColors('warning', '245, 158, 11'),
    ...getColors('info', '14, 165, 233'),
    ...getColors('success', '34, 197, 94'),
  },

  dark: {
    ...getColors('text', '241, 245, 249'),
    ...getColors('text-secondary', '148, 163, 184'),
    ...getColors('textSecondary', '148, 163, 184'),

    ...getColors('bg', '15, 23, 42'),
    ...getColors('bg-secondary', '30, 41, 59'),
    ...getColors('bgSecondary', '30, 41, 59'),
    
    ...getColors('border', '51, 65, 85'),

    ...getColors('primary', '96, 165, 250'),
    ...getColors('error', '248, 113, 113'),
    ...getColors('warning', '251, 191, 36'),
    ...getColors('info', '56, 189, 248'),
    ...getColors('success', '74, 222, 128'),
  },
};



function getColors<T extends ColorStateNames>(name: T, values: string) {
    return [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].reduce((acc, shade) => ({
        ...acc, [`${name}-${shade}`]: `rgba(${values}, ${shade / 100})`
    }), {[name]: `rgb(${values})`} as Record<`${T}${'' | `-${ColorShades}`}`, string>)
}