'use client';

import useCollapseDrawer from '@root/hooks/useCollapseDrawer';
import { ReactNode, Suspense, useState } from 'react';
import DashboardHeader from './header';
import NavbarVertical from './navbar/NavbarVertical';
import { styled } from '@mui/material/styles';
import { HEADER, NAVBAR } from '@root/config';
import { Box } from '@mui/material';

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { collapseClick, isCollapse } = useCollapseDrawer();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        sx={{
          display: { lg: 'flex' },
          minHeight: { lg: 1 },
        }}
      >
        <DashboardHeader isCollapse={isCollapse} onOpenSidebar={() => setOpen(true)} />
        <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <MainStyle collapseClick={collapseClick}>
          <Suspense>{children}</Suspense>
        </MainStyle>
      </Box>
    </>
  );
}

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})<{ collapseClick: boolean }>(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  paddingLeft: 16,
  paddingRight: 16,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));
