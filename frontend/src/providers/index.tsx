import type { ReactNode } from 'react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { headers as nextHeaders } from 'next/headers';
import { CssBaseline } from '@mui/material';

import Script from 'next/script';
import theme from '@root/theme';
import { CollapseDrawerProvider } from '@root/context/CollapseDrawerContext';
import NotistackProvider from './NotistackProvider';

interface Props {
  children: ReactNode;
}

export default async function Providers({ children }: Props) {
  const headers = await nextHeaders();
  const nonce = headers.get('x-nonce') ?? '';
  return (
    <>
      <AppRouterCacheProvider
        options={{
          enableCssLayer: true,
          key: 'css',
          nonce,
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NotistackProvider>
            <CollapseDrawerProvider>
                <>{children}</>
            </CollapseDrawerProvider>
          </NotistackProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
      <Script strategy='afterInteractive' nonce={nonce} />
    </>
  );
}