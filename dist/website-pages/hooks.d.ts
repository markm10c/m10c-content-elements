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

export { usePreviewSender, useWebsiteData };
