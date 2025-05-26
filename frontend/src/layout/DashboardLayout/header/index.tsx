import { Theme, styled, useTheme } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import { HEADER, NAVBAR } from '@root/config';
import AccountPopover from './AccountPopover';
import useResponsive from '@hooks/useResponsive';
import useOffSetTop from '@hooks/useOffSetTop';
import Logo from '@components/Logo';
import cssStyles from '@root/utils/cssStyles';
import NotificationsPopover from './NotificationsPopover';

interface Props {
  onOpenSidebar?: () => void;
  isCollapse?: boolean;
  isOffset?: boolean;
  verticalLayout?: boolean;
}

export default function DashboardHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}: Props) {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;
  const isDesktop = useResponsive('up', 'lg');
  const theme = useTheme();
  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            {icon(theme)}
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction='row' alignItems='center' spacing={{ xs: 0.5, sm: 1.5 }}>
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})<Props>(({ isCollapse = false, isOffset = false, verticalLayout = false, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

const icon = (theme: Theme) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
    <path
      opacity='0.32'
      d='M15.2798 4.5H4.7202C3.77169 4.5 3 5.06057 3 5.75042C3 6.43943 3.77169 7 4.7202 7H15.2798C16.2283 7 17 6.43943 17 5.75042C17 5.06054 16.2283 4.5 15.2798 4.5Z'
      fill={theme.palette.primary.main}
    />
    <path
      d='M19.2798 10.75H8.7202C7.77169 10.75 7 11.3106 7 12.0004C7 12.6894 7.77169 13.25 8.7202 13.25H19.2798C20.2283 13.25 21 12.6894 21 12.0004C21 11.3105 20.2283 10.75 19.2798 10.75Z'
      fill={theme.palette.primary.main}
    />
    <path
      d='M15.2798 17H4.7202C3.77169 17 3 17.5606 3 18.2504C3 18.9394 3.77169 19.5 4.7202 19.5H15.2798C16.2283 19.5 17 18.9394 17 18.2504C17 17.5606 16.2283 17 15.2798 17Z'
      fill={theme.palette.primary.main}
    />
  </svg>
);
