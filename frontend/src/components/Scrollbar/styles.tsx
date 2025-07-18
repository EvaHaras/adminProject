import SimpleBar from 'simplebar-react';
import { alpha, styled, Theme } from '@mui/material/styles';

export const StyledRootScrollbar = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
}));

export const StyledScrollbar = styled(SimpleBar)(
  ({ theme }: { theme: Theme; timeout: number }) => ({
    maxHeight: '100%',
    '& .simplebar-scrollbar': {
      '&:before': {
        backgroundColor: alpha(theme.palette.grey[300], 0.98),
      },
      '&.simplebar-visible:before': {
        opacity: 1,
      },
    },
    '& .simplebar-track.simplebar-vertical': {
      width: 10,
    },
    '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
      height: 6,
    },
    '& .simplebar-mask': {
      zIndex: 'inherit',
    },
  }),
);
