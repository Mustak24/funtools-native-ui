import React from 'react';
import type { Preview } from '@storybook/react';
import { StyleSheet } from 'react-native-web';
import FuntoolsNativeUIProvider from '../src/FuntoolsNativeUIProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Global DOM element style sanitizer to prevent Array or numeric keys in style prop
const originalCreateElement = React.createElement;
(React as any).createElement = function (type: any, props: any, ...children: any[]) {
  if (typeof type === 'string' && props && props.style) {
    let style = props.style;
    if (Array.isArray(style)) {
      style = StyleSheet.flatten(style);
    }
    if (style && typeof style === 'object' && !Array.isArray(style)) {
      const cleanedStyle: any = { ...style };
      if ('paddingInline' in cleanedStyle) {
        cleanedStyle.paddingHorizontal = cleanedStyle.paddingHorizontal ?? cleanedStyle.paddingInline;
        delete cleanedStyle.paddingInline;
      }
      if ('marginInline' in cleanedStyle) {
        cleanedStyle.marginHorizontal = cleanedStyle.marginHorizontal ?? cleanedStyle.marginInline;
        delete cleanedStyle.marginInline;
      }
      for (const key in cleanedStyle) {
        if (!isNaN(Number(key))) {
          delete cleanedStyle[key];
        }
      }
      props = { ...props, style: cleanedStyle };
    }
  }
  return originalCreateElement.apply(this, [type, props, ...children]);
};

const initialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <FuntoolsNativeUIProvider>
          <div style={{ padding: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Story />
          </div>
        </FuntoolsNativeUIProvider>
      </SafeAreaProvider>
    ),
  ],
};

export default preview;
