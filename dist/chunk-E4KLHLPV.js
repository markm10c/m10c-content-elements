// src/pods/website-pages/hooks/use-preview-sender.ts
import { useCallback, useEffect, useRef } from "react";
function usePreviewSender(config) {
  const iframeRef = useRef(null);
  const contentRef = useRef(config.content);
  contentRef.current = config.content;
  const sendContent = useCallback(
    (content) => {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow || !config.previewUrl) return;
      iframe.contentWindow.postMessage(
        {
          type: "m10c-cms-preview",
          content,
          pagePath: config.pagePath
        },
        config.previewUrl
      );
    },
    [config.pagePath, config.previewUrl]
  );
  useEffect(() => {
    function handleMessage(event) {
      if (event.data?.type === "m10c-cms-preview-ready") {
        sendContent(contentRef.current);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [sendContent]);
  useEffect(() => {
    sendContent(config.content);
  }, [config.content, sendContent]);
  return { iframeRef };
}

export {
  usePreviewSender
};
//# sourceMappingURL=chunk-E4KLHLPV.js.map