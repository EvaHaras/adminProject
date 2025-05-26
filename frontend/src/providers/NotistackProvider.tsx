'use client';

import { ReactNode, useRef } from 'react';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, GlobalStyles, IconButton } from '@mui/material';
import Iconify from '@components/Iconfiy';

interface Props {
  children: ReactNode;
}

export default function NotistackProvider({ children }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const notistackRef = useRef<any>(null);

  const onClose = (key: SnackbarKey) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>
      <SnackbarStyles />

      <SnackbarProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        variant='success'
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        iconVariant={{
          info: <SnackbarIcon icon={'eva:info-fill'} color='success' />,
          success: <SnackbarIcon icon={'eva:checkmark-circle-2-fill'} color='success' />,
          warning: <SnackbarIcon icon={'eva:alert-triangle-fill'} color='warning' />,
          error: <SnackbarIcon icon={'eva:alert-circle-fill'} color='error' />,
        }}
        action={(key: SnackbarKey) => (
          <IconButton size='small' onClick={onClose(key)} sx={{ p: 0.5 }}>
            <Iconify icon={'eva:close-fill'} color={'white'} />
          </IconButton>
        )}
      >
        {children}
      </SnackbarProvider>
    </>
  );
}

function SnackbarStyles() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <GlobalStyles
      styles={{
        '#root': {
          '& .SnackbarContent-root': {
            width: '100%',
            padding: theme.spacing(1),
            margin: theme.spacing(0.25, 0),
            boxShadow: theme.shadows[8],
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.grey[isLight ? 100 : 800],
            backgroundColor: theme.palette.grey[isLight ? 900 : 100],
            '&.SnackbarItem-variantSuccess, &.SnackbarItem-variantError, &.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo':
              {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              },
            [theme.breakpoints.up('md')]: {
              minWidth: 240,
            },
          },
          '& .SnackbarItem-message': {
            padding: '0 !important',
            fontWeight: theme.typography.fontWeightMedium,
          },
          '& .SnackbarItem-action': {
            marginRight: 0,
            color: theme.palette.action.active,
            '& svg': { width: 20, height: 20 },
          },
        },
      }}
    />
  );
}

interface SnackbarIconProps {
  icon: string;
  color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
}

function SnackbarIcon({ icon, color }: SnackbarIconProps) {
  return (
    <Box
      component='span'
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
      }}
    >
      <Iconify icon={icon} width={24} height={24} />
    </Box>
  );
}