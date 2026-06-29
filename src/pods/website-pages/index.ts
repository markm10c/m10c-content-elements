// Primary website-pages surface — the admin block/SEO editor and live-preview
// sender (the main consumer, the CMS admin). Pulls in MUI + m10c-mui-kit.
// The published-site data hook lives in the lighter ./data entry so a site that
// only renders pages doesn't have to resolve the editor's UI dependencies.
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
