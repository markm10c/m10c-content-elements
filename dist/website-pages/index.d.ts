import React$1 from 'react';
import { FieldProp } from 'react-typed-form';
import { f as BlockTypeInput, B as Block, c as BlockFieldRenderers } from '../types-BHroyBTX.js';
export { a as BlockFieldRenderer, b as BlockFieldRendererProps, d as BlockType, e as BlockTypeField, L as ListField, S as SimpleField, g as SimpleFieldKind } from '../types-BHroyBTX.js';

type Props$2 = {
    blockTypes: readonly BlockTypeInput[];
    field: FieldProp<Block[]>;
    renderers?: BlockFieldRenderers;
};
declare function BlocksField({ blockTypes, field, renderers }: Props$2): React$1.JSX.Element;

type Props$1 = {
    blockTypes: readonly BlockTypeInput[];
    field: FieldProp<Block[]>;
    renderers?: BlockFieldRenderers;
    /** Site origin for the preview iframe and postMessage target. */
    previewUrl: string;
    pagePath: string;
    previewContent: Record<string, unknown>;
    isSaving?: boolean;
    onPublish: () => void;
};
declare function PageEditor({ blockTypes, field, renderers, previewUrl, pagePath, previewContent, isSaving, onPublish, }: Props$1): React$1.JSX.Element;

type Props = {
    pageTitleField: FieldProp<string | null>;
    descriptionField: FieldProp<string | null>;
    imageField?: FieldProp<string | null>;
    renderImageField?: (field: FieldProp<string | null>) => React$1.ReactNode;
    imagePreviewUrl?: string;
    fallbackTitle: string;
    siteName?: string;
    isSaving?: boolean;
    onPublish: () => void;
};
declare function SeoEditor({ pageTitleField, descriptionField, imageField, renderImageField, imagePreviewUrl, fallbackTitle, siteName, isSaving, onPublish, }: Props): React$1.JSX.Element;

type UsePreviewSenderConfig = {
    /** The full preview URL to load in the iframe */
    previewUrl: string;
    /** The current page path */
    pagePath: string;
    /** The current form content to send to the preview */
    content: Record<string, unknown>;
};
type UsePreviewSenderResult = {
    /** Ref to attach to the iframe element */
    iframeRef: React.RefObject<HTMLIFrameElement | null>;
};
declare function usePreviewSender(config: UsePreviewSenderConfig): UsePreviewSenderResult;

export { Block, BlockFieldRenderers, BlockTypeInput, BlocksField, PageEditor, SeoEditor, usePreviewSender };
