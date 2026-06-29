import React$1 from 'react';
import { FieldProp } from 'react-typed-form';

type SimpleFieldKind = 'text' | 'textarea' | 'richtext' | 'markdown' | 'image';
type SimpleField = {
    kind: SimpleFieldKind;
    label?: string;
    maxLength?: number;
    /** Markdown feature flags, e.g. ['bold', 'italic', 'lists', 'links'] */
    features?: string[];
};
type ListField = {
    kind: 'list';
    label?: string;
    itemLabel?: string;
    minItems?: number;
    maxItems?: number;
    itemFields: Record<string, SimpleField>;
};
type BlockTypeField = SimpleField | ListField;
type BlockType = {
    key: string;
    label: string;
    fields: Record<string, BlockTypeField>;
};
/**
 * Boundary type for the `blockTypes` prop. Consumers pass block types straight
 * from their generated `/block-types` endpoint, whose schema can't express the
 * rich `fields` metadata (it commonly generates as `string[]`). We accept the
 * structural minimum here and narrow `fields` to `BlockType` internally, so
 * consumers never need to cast or import `BlockType`.
 */
type BlockTypeInput = {
    key: string;
    label: string;
    fields: unknown;
};
type Block = {
    type: string;
    data: Record<string, unknown>;
};
type BlockFieldRendererProps = {
    name: string;
    label: string;
    value: string | null;
    onChange: (value: string | null) => void;
};
type BlockFieldRenderer = (props: BlockFieldRendererProps) => React.ReactNode;
type BlockFieldRenderers = Partial<Record<SimpleFieldKind | string, BlockFieldRenderer>>;

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

type UseWebsiteDataConfig = {
    path: string;
    /**
     * Page data fetched on the server and passed in as a prop. Used as the data
     * source for normal (non-preview) rendering, so the published content is in
     * the initial server-rendered HTML rather than fetched on the client.
     */
    initialData?: Record<string, unknown> | null;
    /**
     * Optional client-side fetcher. Only used when no `initialData` is provided
     * (e.g. the server fetch failed). When `initialData` is set this is ignored.
     */
    fetchData?: () => Promise<Record<string, unknown>>;
};
type UseWebsiteDataResult = {
    data: Record<string, unknown>;
    isPreview: boolean;
    isLoading: boolean;
};
declare function useWebsiteData(config: UseWebsiteDataConfig): UseWebsiteDataResult;

export { type Block, type BlockFieldRenderer, type BlockFieldRendererProps, type BlockFieldRenderers, type BlockType, type BlockTypeField, type BlockTypeInput, BlocksField, type ListField, PageEditor, SeoEditor, type SimpleField, type SimpleFieldKind, usePreviewSender, useWebsiteData };
