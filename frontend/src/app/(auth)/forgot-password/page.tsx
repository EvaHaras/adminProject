

import { Stack, Typography } from "@mui/material";
import React from "react";
import { Metadata } from 'next/types';
import ForgotPassword from "@components/signInPage/ForgotPasswordForm";

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Забули пароль | CRM',
  description: '',
  keywords: '',
};

const Page = () =>{
      return (
          <Stack spacing={4}
            maxWidth={'sm'} sx={{width:'100%', textAlign:'left', margin:'auto'}} >
            <Stack spacing={1}>
              <Typography variant="h2" >Забули пароль в CRM</Typography>
              <Typography variant="body1">Введіть свої дані нижче</Typography>
            </Stack>
            <ForgotPassword/>
          </Stack>
      );
}

export default Page