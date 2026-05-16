# @funtools/native-ui

A UI component library for React Native with theme-aware components, ripple interactions, icon and loader utilities.

## 🚀 Installation

```bash
npm install @funtools/native-ui
```

### Peer dependencies

Install these in your application:

- `react` (>=18.0.0)
- `react-native` (>=0.72.0)
- `react-native-safe-area-context` (>=5.7.0)
- `@funtools/store` (^1.0.4)
- `lucide-react-native` (^0.577.0)

```bash
npm install react react-native react-native-safe-area-context @funtools/store lucide-react-native
```

## ✅ Quick Start

```tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeView, ThemeText, Icon } from '@funtools/native-ui/core';
import { Button, IconButton, Input, SpinnerLoader } from '@funtools/native-ui/components';
import { useThemeStore, toggleTheme } from '@funtools/native-ui/theme';

export default function App() {
  const theme = useThemeStore(state => state.theme);

  return (
    <ThemeView style={{ flex: 1, padding: 16 }}>
      <ThemeText style={{ fontSize: 20, marginBottom: 12 }}>Theme: {theme}</ThemeText>
      <Button title="Toggle theme" onPress={toggleTheme} color="primary" />
      <Input placeholder="Type here" style={{ marginTop: 12, borderWidth: 1, borderColor: '#ccc', padding: 8 }} />
      <IconButton icon="Plus" onPress={() => console.log('pressed')} style={{ marginTop: 12 }} />
      <SpinnerLoader style={{ marginTop: 12 }} />
    </ThemeView>
  );
}
```

## 📦 Exports
- UI components: `@funtools/native-ui/components`
- Core helpers: `@funtools/native-ui/core`
- Theme manager: `@funtools/native-ui/theme`
- Hooks: `@funtools/native-ui/hooks`

## 🎯 Components

### Button

Import: `import { Button } from '@funtools/native-ui';`

Props:
- `title: string` (required)
- `startIcon?: IconName`
- `endIcon?: IconName`
- `variant?: 'soft' | 'filled' | 'outlined' | ...` (defaults to `soft`)
- `color?: ColorState` (defaults to `primary`)
- `rounded?: number`
- `fontSize?: number` (default 16)
- `loading?: boolean`
- `loaderName?: SpinnerLoaderProps['name']`
- `disabled?: boolean`
- spreads `RippleContainerProps` (tap ripple, onPress, etc)

### IconButton

Import: `import { IconButton } from '@funtools/native-ui';`

Props:
- `icon: IconName` (required)
- `variant?: ButtonVariant` (defaults to `soft`)
- `color?: ColorState` (defaults to `primary`)
- `size?: number` (default 40)
- `iconSize?: number` (default `size * 0.6`)
- `rounded?: number` (default 40)
- `loading?: boolean`
- `loaderName?: SpinnerLoaderProps['name']`
- `disabled?: boolean`
- spreads `RippleContainerProps`

### Input

Import: `import { Input } from '@funtools/native-ui';`

Props:
- all `TextInputProps`
- `useTrim?: boolean` (not yet used internally but available for future logic)
- `color?: string` or theme color key

### SpinnerLoader

Import: `import { SpinnerLoader } from '@funtools/native-ui';`

Props:
- `name?: 'LoaderPinwheel' | 'LoaderCircle' | 'Loader' | 'LoaderRefresh'` (default `LoaderPinwheel`)
- other icon props (size, color, strokeWidth, etc)

### Icon

Import: `import { Icon } from '@funtools/native-ui';`

Designed as a wrapper around `lucide-react-native`:
- `name: IconName` (Lucide icon name)
- `size?: number` (default 16)
- `color?: ColorState` (theme color key)
- `customColor?: string`
- `alpha?: number` (opacity percentage, default 100)

## 🧩 Core utilities

- `ThemeView`: color-aware container from `theme.colors.bg` / `bg-secondary`
- `ThemeText`: text component that uses theme color by default
- `RippleContainer`: touchable wrapper with ripple effect and `opacity` state
- `Show`: conditional render helper
- `Icon`, `ThemeText`, `ThemeView` are intended to be used together for consistent themed UI.

## 🌈 Theme system

`@funtools/native-ui/theme` exposes:

- `useThemeStore` - read theme values (`theme`, `colors`)
- `toggleTheme` - use this function to toggle between `light` and `dark` themes
- `updateTheme` - advanced function to update theme values
- `updateColors` - advanced function to update specific color values or hole color palette

Theme values:
- `light` and `dark`
- color states: `text`, `text-secondary`, `bg`, `bg-secondary`, `border`, `primary`, `error`, `warning`, `info`, `success`

### Toggle theme

```tsx
import { toggleTheme } from '@funtools/native-ui/theme';

<Button title="Toggle Theme" onPress={toggleTheme} />
```

### Manual Theme Config for custom colors

```tsx
import { updateColors } from '@funtools/native-ui/theme';

function configTheme() {
    updateTheme({
        primary: '#4caf50',
        error: '#f44336',
        // ... other
    })
}
```


## 🛠️ Advanced usage

- `Button`/`IconButton` can use theme colors: `primary`, `error`, `success`, etc.
- `Input` accepts `color` key or raw color string.
- `SpinnerLoader` works with any icon color, and rotates using `Animated.loop`.

## 🧪 Development

```bash
npm run build
npm run lint
npm run dev:yalc   # auto-build + yalc push
npm run dev:npm    # auto-build + npm link
```

## 📘 Contribution

1. Fork repo
2. Create feature branch
3. `npm install`
4. `npm run build`
5. Open PR with details + tests

## 📝 License

MIT
