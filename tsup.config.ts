import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'components/index': 'src/components/index.ts',
    'hooks/index': 'src/hooks/index.ts',
  },
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'react-typed-form',
    '@mui/material',
    '@mui/icons-material',
    '@m10c/mui-kit',
  ],
});
