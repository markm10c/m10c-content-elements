import { useEffect, useState } from 'react';

type PreviewMessage = {
  type: 'm10c-cms-preview';
  content: Record<string, unknown>;
  pagePath: string;
};

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

export default function useWebsiteData(
  config: UseWebsiteDataConfig,
): UseWebsiteDataResult {
  const [apiData, setApiData] = useState<Record<string, unknown>>(
    config.initialData ?? {},
  );
  const [previewData, setPreviewData] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isPreview] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      new URLSearchParams(window.location.search).has('preview') ||
      window.self !== window.top
    );
  });

  useEffect(() => {
    if (!isPreview) return;

    function handleMessage(event: MessageEvent) {
      const message = event.data as PreviewMessage;
      if (message?.type !== 'm10c-cms-preview') return;
      setPreviewData(message.content);
    }

    window.addEventListener('message', handleMessage);
    window.parent.postMessage({ type: 'm10c-cms-preview-ready' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, [isPreview]);

  useEffect(() => {
    // In preview mode data comes from postMessage; when the server already
    // provided initialData there is nothing to fetch on the client. Only fall
    // back to a client fetch if the server render produced no data.
    if (isPreview || config.initialData || !config.fetchData) return;

    setIsLoading(true);
    config.fetchData().then((result) => {
      setApiData(result);
      setIsLoading(false);
    });
  }, [isPreview, config.initialData, config.fetchData, config.path]);

  return {
    data: isPreview ? (previewData ?? {}) : apiData,
    isPreview,
    isLoading,
  };
}
