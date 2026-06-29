export { B as Block, a as BlockFieldRenderer, b as BlockFieldRendererProps, c as BlockFieldRenderers, d as BlockType, e as BlockTypeField, f as BlockTypeInput, L as ListField, S as SimpleField, g as SimpleFieldKind } from '../types-BHroyBTX.js';

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

export { useWebsiteData };
