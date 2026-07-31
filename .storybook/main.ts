import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: [
          {
            find: /^react-native\/Libraries\/Utilities\/codegenNativeComponent$/,
            replacement: path.resolve(__dirname, './codegenNativeComponentStub.js'),
          },
          {
            find: /^react-native$/,
            replacement: path.resolve(__dirname, './react-native-web-patch.js'),
          },
          {
            find: /^react-native\/(.*)$/,
            replacement: 'react-native-web',
          },
          {
            find: 'lucide-react-native',
            replacement: 'lucide-react',
          },
          {
            find: '@core',
            replacement: path.resolve(__dirname, '../src/core/index.ts'),
          },
          {
            find: '@theme',
            replacement: path.resolve(__dirname, '../src/theme/index.ts'),
          },
          {
            find: '@components',
            replacement: path.resolve(__dirname, '../src/components/index.ts'),
          },
          {
            find: '@hooks',
            replacement: path.resolve(__dirname, '../src/hooks/index.ts'),
          },
          {
            find: '@shared',
            replacement: path.resolve(__dirname, '../src/shared'),
          },
        ],
        extensions: [
          '.web.js',
          '.web.jsx',
          '.web.ts',
          '.web.tsx',
          '.mjs',
          '.js',
          '.ts',
          '.jsx',
          '.tsx',
          '.json',
        ],
      },
    });
  },
};

export default config;
