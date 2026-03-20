import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'theme/index': './src/theme/build.export.ts',
    'core/index': './src/core/index.ts',
    'components/index': './src/components/index.ts',
    'ui/index': './src/ui/index.ts',
    'hooks/index': './src/hooks/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-native', '@funtools/store', 'react-native-safe-area-context', 'lucide-react-native'],
  treeshake: true,
});
