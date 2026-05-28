# @funtools/native-ui

A UI component library for React Native with theme-aware components, ripple interactions, icon and loader utilities.

## 🚀 Installation

```bash
npm install @funtools/native-ui
```

### Peer dependencies

Install these in your application:

- `react`
- `react-native`
- `react-native-safe-area-context`
- `@funtools/store`
- `lucide-react-native`

```bash
npm install react react-native react-native-safe-area-context @funtools/store lucide-react-native
```

## ✅ Quick Start

```tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeView, ThemeText, Icon, ShowWithAnimation } from '@funtools/native-ui/core';
import { Button, IconButton, Input, SpinnerLoader } from '@funtools/native-ui';
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
      <ShowWithAnimation when={theme === 'dark'} otherwise={<ThemeText style={{ marginTop: 12 }}>Light mode</ThemeText>}>
        <ThemeText style={{ marginTop: 12 }}>Dark mode</ThemeText>
      </ShowWithAnimation>
    </ThemeView>
  );
}
```

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
