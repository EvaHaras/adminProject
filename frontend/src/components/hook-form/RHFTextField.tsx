import { Controller, useFormContext } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface Props extends Omit<TextFieldProps, 'name'> {
  name: string;
  placeholder?: string
}

export const RHFTextField = ({ name, placeholder, ...other }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...other}
          {...field}
          value={field.value}
          placeholder={placeholder}
          fullWidth
          error={!!error}
          helperText={error?.message ?? ''}
        />
      )}
    />
  );
};
