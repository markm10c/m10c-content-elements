import React from 'react';
import { FieldProp } from 'react-typed-form';
import { BlockTypeInput, Block, BlockFieldRenderers } from './types.js';

type Props$2 = {
    blockTypes: readonly BlockTypeInput[];
    field: FieldProp<Block[]>;
    renderers?: BlockFieldRenderers;
};
declare function BlocksField({ blockTypes, field, renderers }: Props$2): React.JSX.Element;

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
declare function PageEditor({ blockTypes, field, renderers, previewUrl, pagePath, previewContent, isSaving, onPublish, }: Props$1): React.JSX.Element;

type Props = {
    pageTitleField: FieldProp<string | null>;
    descriptionField: FieldProp<string | null>;
    imageField?: FieldProp<string | null>;
    renderImageField?: (field: FieldProp<string | null>) => React.ReactNode;
    imagePreviewUrl?: string;
    fallbackTitle: string;
    siteName?: string;
    isSaving?: boolean;
    onPublish: () => void;
};
declare function SeoEditor({ pageTitleField, descriptionField, imageField, renderImageField, imagePreviewUrl, fallbackTitle, siteName, isSaving, onPublish, }: Props): React.JSX.Element;

export { BlocksField, PageEditor, SeoEditor };
