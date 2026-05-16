import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'components/index': './src/exports/build.components.ts',
    'theme/index': './src/exports/build.theme.ts',
    'core/index': './src/exports/build.core.ts',
    'hooks/index': './src/exports/build.hooks.ts',
    'utils/index': './src/exports/build.utils.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-native', '@funtools/store', 'react-native-safe-area-context', 'lucide-react-native'],
  treeshake: true,
});
