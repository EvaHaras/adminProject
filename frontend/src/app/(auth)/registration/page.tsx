

import { Stack, Typography } from "@mui/material";
import React from "react";
import { Metadata } from 'next/types';
import Login from "@components/signInPage/LoginForm";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Реєстрація | CRM',
  description: '',
  keywords: '',
};

const Page = () =>{
      return (
          <Stack spacing={4}
            maxWidth={'sm'} sx={{width:'100%', textAlign:'left', margin:'auto'}} >
            <Stack spacing={1}>
              <Typography variant="h2" >Реєстрація в CRM</Typography>
              <Typography variant="body1">Введіть свої дані нижче</Typography>
            </Stack>
            <Login/>
          </Stack>
      );
}

export default Page