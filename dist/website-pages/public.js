// src/pods/website-pages/hooks/use-website-data.ts
import { useEffect, useState } from "react";
function useWebsiteData(config) {
  const [apiData, setApiData] = useState(
    config.initialData ?? {}
  );
  const [previewData, setPreviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreview] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).has("preview") || window.self !== window.top;
  });
  useEffect(() => {
    if (!isPreview) return;
    function handleMessage(event) {
      const message = event.data;
      if (message?.type !== "m10c-cms-preview") return;
      setPreviewData(message.content);
    }
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "m10c-cms-preview-ready" }, "*");
    return () => window.removeEventListener("message", handleMessage);
  }, [isPreview]);
  useEffect(() => {
    if (isPreview || config.initialData || !config.fetchData) return;
    setIsLoading(true);
    config.fetchData().then((result) => {
      setApiData(result);
      setIsLoading(false);
    });
  }, [isPreview, config.initialData, config.fetchData, config.path]);
  return {
    data: isPreview ? previewData ?? {} : apiData,
    isPreview,
    isLoading
  };
}
export {
  useWebsiteData
};
//# sourceMappingURL=public.js.map