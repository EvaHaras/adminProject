import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import Logo from '@components/Logo';

interface Props {
  children: ReactNode;
}

export default function LogoOnlyLayout({ children }: Props) {
  return (
    <>
      <Box
        component={'header'}
        sx={{
          top: 0,
          left: 0,
          lineHeight: 0,
          position: 'absolute',
          padding: { xs: 3, sm: 5 },
        }}
      >
        <Logo />
      </Box>
      {children}
    </>
  );
}
