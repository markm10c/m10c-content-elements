import {
  usePreviewSender
} from "../chunk-E4KLHLPV.js";

// src/pods/website-pages/components/BlocksField.tsx
import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { FieldText } from "m10c-mui-kit/form";
import React from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function BlocksField({ blockTypes, field, renderers }) {
  const blocks = field.value ?? [];
  const blockTypesByKey = React.useMemo(
    () => Object.fromEntries(
      blockTypes.map((blockType) => [blockType.key, blockType])
    ),
    [blockTypes]
  );
  function updateBlock(index, next) {
    const updated = blocks.slice();
    updated[index] = next;
    field.handleValueChange(updated);
  }
  return /* @__PURE__ */ jsx(Stack, { spacing: 2, children: blocks.map((block, index) => /* @__PURE__ */ jsx(
    BlockCard,
    {
      block,
      blockType: blockTypesByKey[block.type],
      renderers,
      onChange: (next) => updateBlock(index, next)
    },
    index
  )) });
}
function BlockCard({ block, blockType, renderers, onChange }) {
  function updateData(key, value) {
    onChange({ ...block, data: { ...block.data, [key]: value } });
  }
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { sx: { p: 2.5, "&:last-child": { pb: 2.5 } }, children: /* @__PURE__ */ jsxs(Stack, { spacing: 2, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "subtitle1", children: blockType?.label ?? `Unknown block: ${block.type}` }),
    blockType ? Object.entries(blockType.fields).map(([key, fieldDef]) => /* @__PURE__ */ jsx(
      BlockFieldRenderer,
      {
        fieldKey: key,
        fieldDef,
        value: block.data[key],
        renderers,
        onChange: (value) => updateData(key, value)
      },
      key
    )) : /* @__PURE__ */ jsxs(Typography, { variant: "body2", color: "text.secondary", children: [
      'No schema registered for block type "',
      block.type,
      '".'
    ] })
  ] }) }) });
}
function BlockFieldRenderer({
  fieldKey,
  fieldDef,
  value,
  renderers,
  onChange
}) {
  if (fieldDef.kind === "list") {
    return /* @__PURE__ */ jsx(
      ListFieldRenderer,
      {
        fieldDef,
        value: Array.isArray(value) ? value : [],
        renderers,
        onChange
      }
    );
  }
  return /* @__PURE__ */ jsx(
    SimpleFieldRenderer,
    {
      fieldKey,
      fieldDef,
      value,
      renderers,
      onChange
    }
  );
}
function SimpleFieldRenderer({
  fieldKey,
  fieldDef,
  value,
  renderers,
  labelOverride,
  onChange
}) {
  const stringValue = typeof value === "string" ? value : null;
  const label = labelOverride ?? fieldDef.label ?? fieldKey;
  const customRenderer = renderers?.[fieldDef.kind];
  if (customRenderer) {
    return /* @__PURE__ */ jsx(Fragment, { children: customRenderer({ name: fieldKey, label, value: stringValue, onChange }) });
  }
  const fieldProp = {
    name: fieldKey,
    label,
    value: stringValue,
    handleValueChange: onChange
  };
  const multiline = fieldDef.kind === "textarea" || fieldDef.kind === "markdown" || fieldDef.kind === "richtext";
  return /* @__PURE__ */ jsxs(Stack, { spacing: 1, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "subtitle2", children: label }),
    /* @__PURE__ */ jsx(
      FieldText,
      {
        field: fieldProp,
        hiddenLabel: true,
        multiline,
        minRows: multiline ? 2 : void 0,
        inputProps: fieldDef.maxLength ? { maxLength: fieldDef.maxLength } : void 0
      }
    )
  ] });
}
function ListFieldRenderer({
  fieldDef,
  value,
  renderers,
  onChange
}) {
  const items = value;
  const itemLabel = fieldDef.itemLabel ?? fieldDef.label ?? "Item";
  function updateItem(index, next) {
    const updated = items.slice();
    updated[index] = next;
    onChange(updated);
  }
  return /* @__PURE__ */ jsx(Stack, { spacing: 2, children: items.map((item, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
    index > 0 && /* @__PURE__ */ jsx(Divider, {}),
    Object.entries(fieldDef.itemFields).map(([subKey, subFieldDef]) => /* @__PURE__ */ jsx(
      SimpleFieldRenderer,
      {
        fieldKey: subKey,
        fieldDef: subFieldDef,
        value: item[subKey],
        renderers,
        labelOverride: `${subFieldDef.label ?? subKey} ${itemLabel} ${index + 1}`,
        onChange: (subValue) => updateItem(index, { ...item, [subKey]: subValue })
      },
      subKey
    ))
  ] }, index)) });
}

// src/pods/website-pages/components/PageEditor.tsx
import {
  Devices,
  KeyboardArrowDown,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack as Stack2
} from "@mui/material";
import React2 from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var PREVIEW_WIDTHS = {
  desktop: 1280,
  tablet: 768,
  mobile: 375
};
function PageEditor({
  blockTypes,
  field,
  renderers,
  previewUrl,
  pagePath,
  previewContent,
  isSaving,
  onPublish
}) {
  const [showPreview, setShowPreview] = React2.useState(true);
  const [previewWidth, setPreviewWidth] = React2.useState("desktop");
  const { iframeRef } = usePreviewSender({
    previewUrl,
    pagePath,
    content: previewContent
  });
  const previewSrc = `${previewUrl}/${pagePath === "home" ? "" : pagePath}?preview`;
  return /* @__PURE__ */ jsxs2(Box, { sx: { flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
    /* @__PURE__ */ jsxs2(Stack2, { direction: "row", sx: { flex: 1, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxs2(
        Box,
        {
          sx: {
            flex: 1,
            minWidth: 0,
            overflow: "auto",
            p: 3,
            pb: 10,
            bgcolor: "background.level1"
          },
          children: [
            !showPreview && /* @__PURE__ */ jsx2(
              Button,
              {
                variant: "outlined",
                size: "small",
                startIcon: /* @__PURE__ */ jsx2(Visibility, {}),
                onClick: () => setShowPreview(true),
                sx: { mb: 2 },
                children: "Show Preview"
              }
            ),
            /* @__PURE__ */ jsx2(
              BlocksField,
              {
                blockTypes,
                field,
                renderers
              }
            )
          ]
        }
      ),
      showPreview && /* @__PURE__ */ jsxs2(Stack2, { sx: { flex: 1, minWidth: 0, bgcolor: "grey.200" }, children: [
        /* @__PURE__ */ jsxs2(Stack2, { direction: "row", spacing: 1, sx: { p: 1.5, flexShrink: 0 }, children: [
          /* @__PURE__ */ jsx2(
            Button,
            {
              variant: "outlined",
              size: "small",
              startIcon: /* @__PURE__ */ jsx2(VisibilityOff, {}),
              onClick: () => setShowPreview(false),
              sx: { whiteSpace: "nowrap", bgcolor: "background.paper" },
              children: "Hide Preview"
            }
          ),
          /* @__PURE__ */ jsx2(FormControl, { size: "small", children: /* @__PURE__ */ jsxs2(
            Select,
            {
              value: previewWidth,
              onChange: (event) => setPreviewWidth(event.target.value),
              startAdornment: /* @__PURE__ */ jsx2(
                Devices,
                {
                  sx: { fontSize: 18, color: "text.secondary", mr: 1 }
                }
              ),
              IconComponent: KeyboardArrowDown,
              sx: { bgcolor: "background.paper" },
              children: [
                /* @__PURE__ */ jsx2(MenuItem, { value: "desktop", children: "Desktop" }),
                /* @__PURE__ */ jsx2(MenuItem, { value: "tablet", children: "Tablet" }),
                /* @__PURE__ */ jsx2(MenuItem, { value: "mobile", children: "Mobile" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx2(
          PreviewIframe,
          {
            iframeRef,
            src: previewSrc,
            renderWidth: PREVIEW_WIDTHS[previewWidth]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx2(
      Stack2,
      {
        direction: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        sx: {
          px: 2,
          py: 1.5,
          flexShrink: 0,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper"
        },
        children: /* @__PURE__ */ jsx2(Button, { variant: "contained", onClick: onPublish, disabled: isSaving, children: "Publish Changes" })
      }
    )
  ] });
}
function PreviewIframe({
  iframeRef,
  src,
  renderWidth
}) {
  const containerRef = React2.useRef(null);
  const [containerWidth, setContainerWidth] = React2.useState(0);
  React2.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  if (!src) return null;
  const scale = containerWidth > 0 ? Math.min(1, containerWidth / renderWidth) : 0.5;
  return /* @__PURE__ */ jsx2(Box, { ref: containerRef, sx: { flex: 1, overflow: "hidden", p: 1.5, pt: 0 }, children: /* @__PURE__ */ jsx2(
    Box,
    {
      sx: {
        width: "100%",
        maxWidth: renderWidth,
        height: "100%",
        overflow: "hidden",
        mx: "auto"
      },
      children: /* @__PURE__ */ jsx2(
        "iframe",
        {
          ref: iframeRef,
          src,
          title: "Page preview",
          style: {
            width: renderWidth,
            height: `${Math.round(100 / scale)}%`,
            border: "none",
            backgroundColor: "white",
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            display: "block",
            borderRadius: 8
          }
        }
      )
    }
  ) });
}

// src/pods/website-pages/components/SeoEditor.tsx
import { Box as Box2, Button as Button2, Chip, Stack as Stack3, Typography as Typography2 } from "@mui/material";
import { FieldText as FieldText2 } from "m10c-mui-kit/form";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function CharacterCount({
  value,
  min,
  max
}) {
  const count = value?.length ?? 0;
  const isGood = count >= min && count <= max;
  const isTooLong = count > max;
  return /* @__PURE__ */ jsxs3(Stack3, { direction: "row", spacing: 1, alignItems: "center", children: [
    /* @__PURE__ */ jsx3(
      Chip,
      {
        size: "small",
        label: isTooLong ? "Too long" : isGood ? "Good" : "Too short",
        color: isTooLong ? "error" : isGood ? "success" : "warning"
      }
    ),
    /* @__PURE__ */ jsxs3(Typography2, { variant: "caption", color: "text.secondary", children: [
      "Character count: ",
      count,
      " (",
      min,
      "-",
      max,
      " recommended)"
    ] })
  ] });
}
function SeoEditor({
  pageTitleField,
  descriptionField,
  imageField,
  renderImageField,
  imagePreviewUrl,
  fallbackTitle,
  siteName = "",
  isSaving,
  onPublish
}) {
  const pageTitle = pageTitleField.value ?? "";
  const description = descriptionField.value ?? "";
  return /* @__PURE__ */ jsxs3(Box2, { sx: { flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }, children: [
    /* @__PURE__ */ jsx3(
      Box2,
      {
        sx: { flex: 1, overflow: "auto", p: 4, pb: 10, bgcolor: "background.level1" },
        children: /* @__PURE__ */ jsxs3(Stack3, { direction: "row", sx: { gap: "56px", justifyContent: "center" }, children: [
          /* @__PURE__ */ jsxs3(Stack3, { sx: { width: 571 }, spacing: 3, children: [
            /* @__PURE__ */ jsxs3(Stack3, { spacing: 1, children: [
              /* @__PURE__ */ jsx3(Typography2, { variant: "subtitle2", children: "Page Title" }),
              /* @__PURE__ */ jsx3(
                FieldText2,
                {
                  field: pageTitleField,
                  hiddenLabel: true,
                  size: "small",
                  fullWidth: true
                }
              ),
              /* @__PURE__ */ jsx3(CharacterCount, { value: pageTitle, min: 45, max: 60 })
            ] }),
            /* @__PURE__ */ jsxs3(Stack3, { spacing: 1, children: [
              /* @__PURE__ */ jsx3(Typography2, { variant: "subtitle2", children: "Description" }),
              /* @__PURE__ */ jsx3(
                FieldText2,
                {
                  field: descriptionField,
                  hiddenLabel: true,
                  size: "small",
                  fullWidth: true,
                  multiline: true,
                  rows: 4
                }
              ),
              /* @__PURE__ */ jsx3(CharacterCount, { value: description, min: 100, max: 150 })
            ] }),
            imageField && renderImageField && renderImageField(imageField)
          ] }),
          /* @__PURE__ */ jsxs3(Stack3, { sx: { width: 555 }, spacing: 3, children: [
            /* @__PURE__ */ jsxs3(Stack3, { spacing: 1, children: [
              /* @__PURE__ */ jsx3(Typography2, { variant: "subtitle2", children: "Search Preview" }),
              /* @__PURE__ */ jsx3(
                Box2,
                {
                  sx: {
                    bgcolor: "white",
                    borderRadius: "20px",
                    p: 2,
                    boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.06), 0px 5px 22px 0px rgba(0,0,0,0.04)"
                  },
                  children: /* @__PURE__ */ jsxs3(Stack3, { spacing: 1.5, children: [
                    /* @__PURE__ */ jsxs3(Stack3, { direction: "row", spacing: 1, alignItems: "center", children: [
                      /* @__PURE__ */ jsx3(
                        Box2,
                        {
                          sx: {
                            width: 20,
                            height: 22,
                            borderRadius: "4px",
                            bgcolor: "grey.300",
                            flexShrink: 0,
                            backgroundImage: imagePreviewUrl ? `url(${imagePreviewUrl})` : void 0,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxs3(Stack3, { children: [
                        /* @__PURE__ */ jsx3(
                          Typography2,
                          {
                            sx: {
                              fontFamily: "Arial, sans-serif",
                              fontSize: 15,
                              color: "#333",
                              lineHeight: 1.2
                            },
                            children: fallbackTitle
                          }
                        ),
                        /* @__PURE__ */ jsx3(
                          Typography2,
                          {
                            sx: {
                              fontFamily: "Arial, sans-serif",
                              fontSize: 12,
                              color: "#828282",
                              lineHeight: 1.2
                            },
                            children: siteName
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx3(
                      Typography2,
                      {
                        sx: {
                          fontFamily: "Arial, sans-serif",
                          fontSize: 22,
                          color: "#1718A4",
                          lineHeight: "22px"
                        },
                        children: pageTitle || fallbackTitle
                      }
                    ),
                    /* @__PURE__ */ jsx3(
                      Typography2,
                      {
                        sx: {
                          fontFamily: "Arial, sans-serif",
                          fontSize: 14,
                          color: "#333",
                          lineHeight: "22px"
                        },
                        children: description || "No description set"
                      }
                    )
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs3(Stack3, { spacing: 1, children: [
              /* @__PURE__ */ jsx3(Typography2, { variant: "subtitle2", children: "Social Media Preview" }),
              /* @__PURE__ */ jsxs3(
                Box2,
                {
                  sx: {
                    bgcolor: "white",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.06), 0px 5px 22px 0px rgba(0,0,0,0.04)"
                  },
                  children: [
                    /* @__PURE__ */ jsx3(
                      Box2,
                      {
                        sx: {
                          height: 260,
                          bgcolor: "grey.300",
                          backgroundImage: imagePreviewUrl ? `url(${imagePreviewUrl})` : void 0,
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxs3(
                      Stack3,
                      {
                        sx: { bgcolor: "grey.100", px: 2, py: 1.5 },
                        spacing: 0.5,
                        children: [
                          /* @__PURE__ */ jsx3(
                            Typography2,
                            {
                              sx: {
                                fontSize: 12,
                                color: "#65676B",
                                textTransform: "uppercase",
                                lineHeight: "15px"
                              },
                              children: siteName
                            }
                          ),
                          /* @__PURE__ */ jsx3(
                            Typography2,
                            {
                              sx: {
                                fontSize: 16,
                                fontWeight: 510,
                                color: "#0F1419",
                                lineHeight: "19px"
                              },
                              children: pageTitle || fallbackTitle
                            }
                          ),
                          /* @__PURE__ */ jsx3(
                            Typography2,
                            {
                              sx: {
                                fontSize: 14,
                                color: "#65676B",
                                lineHeight: "19px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                              },
                              children: description || "No description set"
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx3(
      Stack3,
      {
        direction: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        sx: {
          px: 3,
          py: 2,
          flexShrink: 0,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper"
        },
        children: /* @__PURE__ */ jsx3(Button2, { variant: "contained", onClick: onPublish, disabled: isSaving, children: "Publish Changes" })
      }
    )
  ] });
}
export {
  BlocksField,
  PageEditor,
  SeoEditor
};
//# sourceMappingURL=components.js.map