import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'website-pages/index': 'src/pods/website-pages/index.ts',
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
