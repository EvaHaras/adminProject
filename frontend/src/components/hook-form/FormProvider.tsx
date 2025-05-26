
import { ReactNode } from 'react';
import { FormProvider as FormProviderHook, UseFormReturn } from 'react-hook-form';
import { Box } from '@mui/material';

interface Props {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (data: any) => void;
}

export const FormProvider = ({ children, onSubmit, methods, }: Props) => {
  return (
    <Box sx={{ width:'100%'}}>
      <FormProviderHook {...methods}>
        <form onSubmit={onSubmit}>{children}</form>
      </FormProviderHook>
    </Box>
  );
};
