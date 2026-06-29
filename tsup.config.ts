import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'website-pages/components': 'src/pods/website-pages/components/index.ts',
    'website-pages/hooks': 'src/pods/website-pages/hooks/index.ts',
    'website-pages/types': 'src/pods/website-pages/types.ts',
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
    'm10c-mui-kit',
  ],
});
