import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'theme/index': './src/theme/store.ts',
    'core/index': './src/core/index.ts',
    'components/index': './src/components/index.ts',
    'ui/index': './src/ui/index.ts',
    'hooks/index': './src/hooks/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-native'],
  treeshake: true,
});
