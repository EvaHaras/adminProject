import { useFormContext, Controller } from 'react-hook-form';
import { MenuItem, Select, SelectProps } from '@mui/material';

interface Props extends Omit<SelectProps, 'name'> {
  name: string;
  shrink?: boolean;
  placeholder?: string;
}

export default function RHFSelect({ name, children, placeholder, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          error={!!error}
          displayEmpty
          {...other}
          sx={{
            width: '100%',
            '& .MuiSelect-select': {
              color: field.value === '' ? '#7d8995' : 'inherit', 
            },
          }}
        >
          {placeholder && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}
          {children}
        </Select>
      )}
    />
  );
}
