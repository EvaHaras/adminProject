import { Controller, useFormContext } from 'react-hook-form';
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  useTheme,
  IconButton,
} from '@mui/material';
import {
  ClosePassword,
  OpenPassword,
} from '@root/app/styles/icons';
import { useState } from 'react';

interface Props extends Omit<TextFieldProps, 'name'> {
  name: string;
  placeholder?: string;
}

export const RHFPassword = ({
  name,
  placeholder,
  ...other
}: Props) => {
  const { control } = useFormContext();
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };



  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
      
          <TextField
            {...other}
            {...field}
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: theme.palette.text.primary,
              },
            }}
            fullWidth
            placeholder={placeholder}
            type={showPassword ? 'text' : 'password'}
            error={!!error}
            helperText={error?.message ?? ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ?   <OpenPassword /> : <ClosePassword />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

      )}
    />
  );
};
