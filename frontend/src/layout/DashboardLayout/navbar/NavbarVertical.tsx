import { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Stack, Drawer } from '@mui/material';
// import NavbarAccount from './NavbarAccount';
import CollapseButton from './CollapseButton';
import useResponsive from '@root/hooks/useResponsive';
import useCollapseDrawer from '@root/hooks/useCollapseDrawer';
import Logo from '@components/Logo';
import { NAVBAR } from '@root/config';
import { usePathname } from 'next/navigation';
import cssStyles from '@root/utils/cssStyles';
import NavSection from './NavSection';
import navConfig from './NavConfig';

interface Props {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
}

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }: Props) {
  const theme = useTheme();
  const pathname = usePathname();
  const isDesktop = useResponsive('up', 'lg');
  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isDesktop]);

  const renderContent = (
    <Box
      sx={{
        height: 1,
        overflow: 'hidden'
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: 'center' }),
        }}
      >
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Logo disableText={isCollapse} />
          {isDesktop && !isCollapse && (
            <CollapseButton onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />
          )}
        </Stack>
        {/* <NavbarAccount isCollapse={isCollapse} /> */}
      </Stack>
      <NavSection navConfig={navConfig()} isCollapse={isCollapse} />
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
      {isDesktop && (
        <Drawer
          open
          variant='persistent'
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: 'dashed',
              bgcolor: 'background.default',
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: 'none',
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}

const RootStyle = styled('aside')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));
