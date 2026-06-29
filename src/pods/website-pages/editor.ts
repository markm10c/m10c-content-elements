// Editor surface — the admin block/SEO editor and live-preview sender. Pulls in
// MUI + m10c-mui-kit, so it's a separate entry from the public ./index renderer.
export { default as BlocksField } from './components/BlocksField';
export { default as PageEditor } from './components/PageEditor';
export { default as SeoEditor } from './components/SeoEditor';
export { default as usePreviewSender } from './hooks/use-preview-sender';
export type {
  Block,
  BlockFieldRenderer,
  BlockFieldRenderers,
  BlockFieldRendererProps,
  BlockType,
  BlockTypeField,
  BlockTypeInput,
  ListField,
  SimpleField,
  SimpleFieldKind,
} from './types';
