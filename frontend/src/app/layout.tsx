
// import '@application/styles/globals.css';
// import { Box,} from '@mui/material';
// import Providers from '@root/providers';
// import localFont from 'next/font/local';

// const gothamPro = localFont({
//   src: './styles/fonts/proximanova_regular.ttf',
//   variable: '--font-proximanova-variable',
//   weight: '400 600 700',
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang={'uk-UA'} className={`${gothamPro.variable}`}>
//       <Providers>
//         <Box
//           minHeight={'100%'}
//           display={'flex'}
//           component={'body'}
//         >
//           <>{children}</>
//         </Box>
//       </Providers>
//     </html>
//   );
// }

import type { Metadata } from 'next';

import './styles/globals.css';
import Providers from '@root/providers';
import localFont from 'next/font/local';
import 'simplebar-react/dist/simplebar.min.css';

const proximaNova = localFont({
  variable: '--font-proxima-nova-variable',
  src: [
    {
      path: './styles/fonts/proximanova_regular.ttf',
      weight: '400',
    },
    {
      path: './styles/fonts/proximanova_regular.ttf',
      weight: '500',
    },
    {
      path: './styles/fonts/proximanova_regular.ttf',
      weight: '700',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Root | Project Excelsior',
  description: 'Project Excelsior',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${proximaNova.variable}`} translate={'no'}>
        <Providers>
          {/* <Maintenance/> */}
          <>{children}</>
        </Providers>
      </body>
    </html>
  );
}