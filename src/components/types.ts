export type SimpleFieldKind =
  | 'text'
  | 'textarea'
  | 'richtext'
  | 'markdown'
  | 'image';

export type SimpleField = {
  kind: SimpleFieldKind;
  label?: string;
  maxLength?: number;
  /** Markdown feature flags, e.g. ['bold', 'italic', 'lists', 'links'] */
  features?: string[];
};

export type ListField = {
  kind: 'list';
  label?: string;
  itemLabel?: string;
  minItems?: number;
  maxItems?: number;
  itemFields: Record<string, SimpleField>;
};

export type BlockTypeField = SimpleField | ListField;

export type BlockType = {
  key: string;
  label: string;
  fields: Record<string, BlockTypeField>;
};

export type Block = {
  type: string;
  data: Record<string, unknown>;
};

export type BlockFieldRendererProps = {
  name: string;
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
};

export type BlockFieldRenderer = (
  props: BlockFieldRendererProps,
) => React.ReactNode;

export type BlockFieldRenderers = Partial<
  Record<SimpleFieldKind | string, BlockFieldRenderer>
>;
