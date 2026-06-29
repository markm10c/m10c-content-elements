// Public renderer data hook — safe for the published website (no MUI). Loads the
// server-provided page data for SSR and applies live-preview overrides sent from
// the editor iframe via postMessage. Kept separate from the editor (./index) so
// a site consuming it doesn't pull in MUI / m10c-mui-kit.
export { default as useWebsiteData } from './hooks/use-website-data';
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
