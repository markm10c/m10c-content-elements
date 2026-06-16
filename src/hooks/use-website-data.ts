import { useEffect, useState } from 'react';

type PreviewMessage = {
  type: 'm10c-cms-preview';
  content: Record<string, unknown>;
  pagePath: string;
};

type UseWebsiteDataConfig = {
  path: string;
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
  const [apiData, setApiData] = useState<Record<string, unknown>>({});
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
    if (isPreview || !config.fetchData) return;

    setIsLoading(true);
    config.fetchData().then((result) => {
      setApiData(result);
      setIsLoading(false);
    });
  }, [isPreview, config.fetchData, config.path]);

  return {
    data: isPreview ? (previewData ?? {}) : apiData,
    isPreview,
    isLoading,
  };
}
