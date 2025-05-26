/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { memo } from 'react';
import { Box, BoxProps } from '@mui/material';
import { StyledRootScrollbar, StyledScrollbar } from './styles';

function Scrollbar({ children, sx, ...other }: BoxProps) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx} {...(other as any)}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
}

export default memo(Scrollbar);
