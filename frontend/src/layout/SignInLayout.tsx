'use client';

import {  Stack, Typography } from '@mui/material';
import Image from 'next/image';

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      flexDirection={'row'}
      flex={1}
      alignItems={'center'}
      padding={2}
      justifyContent={'center'}
      height={'100vh'}
    >
      <Stack spacing={2}
      display={{xs:'none', md:'flex'}}
      sx={{
        maxWidth:"464px", 
        width:'100%', 
        justifyContent:'center', 
        textAlign:'center', 
        backgroundColor:'grey.600', 
        height:'100%', 
        borderRadius:'8px',
        marginRight:'16px',}}>
        <Typography variant='h1'>Привіт, ласкаво просимо</Typography>
        <Image
          alt={'dashboard'}
          src={'/assets/images/illustration_dashboard.png'}
          width={0}
          height={0}
          sizes={'100vw'}
          style={{ maxWidth: '450px', width: '100%', height: 'auto' }}
        />
      </Stack>
      <Stack style={{width:'100%',}}>
        {children}
      </Stack>
    </Stack>
  );
}
