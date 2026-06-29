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

export type { Block, BlockFieldRenderer, BlockFieldRendererProps, BlockFieldRenderers, BlockType, BlockTypeField, BlockTypeInput, ListField, SimpleField, SimpleFieldKind };
