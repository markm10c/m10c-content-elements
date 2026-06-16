'use client';

import { Box, Button, Chip, Stack, TextField, Typography } from '@mui/material';
import type React from 'react';
import type { FieldProp } from 'react-typed-form';

type Props = {
  pageTitleField: FieldProp<string | null>;
  descriptionField: FieldProp<string | null>;
  imageField?: FieldProp<string | null>;
  renderImageField?: (field: FieldProp<string | null>) => React.ReactNode;
  imagePreviewUrl?: string;
  fallbackTitle: string;
  siteName?: string;
  isSaving?: boolean;
  onPublish: () => void;
};

function CharacterCount({
  value,
  min,
  max,
}: {
  value: string | null;
  min: number;
  max: number;
}) {
  const count = value?.length ?? 0;
  const isGood = count >= min && count <= max;
  const isTooLong = count > max;

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Chip
        size="small"
        label={isTooLong ? 'Too long' : isGood ? 'Good' : 'Too short'}
        color={isTooLong ? 'error' : isGood ? 'success' : 'warning'}
        sx={{ fontSize: 13, fontWeight: 500 }}
      />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ letterSpacing: 0.4 }}
      >
        Character count: {count} ({min}-{max} recommended)
      </Typography>
    </Stack>
  );
}

export default function SeoEditor({
  pageTitleField,
  descriptionField,
  imageField,
  renderImageField,
  imagePreviewUrl,
  fallbackTitle,
  siteName = '',
  isSaving,
  onPublish,
}: Props) {
  const pageTitle = pageTitleField.value ?? '';
  const description = descriptionField.value ?? '';

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <Box sx={{ flex: 1, overflow: 'auto', p: 4, pb: 10, bgcolor: '#F8F9FA' }}>
        <Stack direction="row" sx={{ gap: '56px', justifyContent: 'center' }}>
          <Stack sx={{ width: 571 }} spacing={3}>
            <Stack spacing={1}>
              <Typography variant="body2" fontWeight={500}>
                Page Title
              </Typography>
              <TextField
                value={pageTitle}
                onChange={(e) =>
                  pageTitleField.handleValueChange(e.target.value)
                }
                hiddenLabel
                size="small"
                fullWidth
              />
              <CharacterCount value={pageTitle} min={45} max={60} />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="body2" fontWeight={500}>
                Description
              </Typography>
              <TextField
                value={description}
                onChange={(e) =>
                  descriptionField.handleValueChange(e.target.value)
                }
                hiddenLabel
                size="small"
                fullWidth
                multiline
                rows={4}
              />
              <CharacterCount value={description} min={100} max={150} />
            </Stack>
            {imageField && renderImageField && renderImageField(imageField)}
          </Stack>

          <Stack sx={{ width: 555 }} spacing={3}>
            <Stack spacing={1}>
              <Typography variant="body2" fontWeight={500}>
                Search Preview
              </Typography>
              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: '20px',
                  p: 2,
                  boxShadow:
                    '0px 0px 0px 1px rgba(0,0,0,0.06), 0px 5px 22px 0px rgba(0,0,0,0.04)',
                }}
              >
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 20,
                        height: 22,
                        borderRadius: '4px',
                        bgcolor: 'grey.300',
                        flexShrink: 0,
                        backgroundImage: imagePreviewUrl
                          ? `url(${imagePreviewUrl})`
                          : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <Stack>
                      <Typography
                        sx={{
                          fontFamily: 'Arial, sans-serif',
                          fontSize: 15,
                          color: '#333',
                          lineHeight: 1.2,
                        }}
                      >
                        {fallbackTitle}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Arial, sans-serif',
                          fontSize: 12,
                          color: '#828282',
                          lineHeight: 1.2,
                        }}
                      >
                        {siteName}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography
                    sx={{
                      fontFamily: 'Arial, sans-serif',
                      fontSize: 22,
                      color: '#1718A4',
                      lineHeight: '22px',
                    }}
                  >
                    {pageTitle || fallbackTitle}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Arial, sans-serif',
                      fontSize: 14,
                      color: '#333',
                      lineHeight: '22px',
                    }}
                  >
                    {description || 'No description set'}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="body2" fontWeight={500}>
                Social Media Preview
              </Typography>
              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow:
                    '0px 0px 0px 1px rgba(0,0,0,0.06), 0px 5px 22px 0px rgba(0,0,0,0.04)',
                }}
              >
                <Box
                  sx={{
                    height: 260,
                    bgcolor: 'grey.300',
                    backgroundImage: imagePreviewUrl
                      ? `url(${imagePreviewUrl})`
                      : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <Stack
                  sx={{ bgcolor: 'grey.100', px: 2, py: 1.5 }}
                  spacing={0.5}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: '#65676B',
                      textTransform: 'uppercase',
                      lineHeight: '15px',
                    }}
                  >
                    {siteName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 510,
                      color: '#0F1419',
                      lineHeight: '19px',
                    }}
                  >
                    {pageTitle || fallbackTitle}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: '#65676B',
                      lineHeight: '19px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {description || 'No description set'}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{
          px: 3,
          py: 2,
          flexShrink: 0,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Button variant="contained" onClick={onPublish} disabled={isSaving}>
          Publish Changes
        </Button>
      </Stack>
    </Box>
  );
}
