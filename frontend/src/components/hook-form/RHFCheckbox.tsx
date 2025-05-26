/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, FormControlLabel, CheckboxProps } from '@mui/material';

interface Props extends CheckboxProps {
  name: string;
  label?: string;
  other?: CheckboxProps;
}

export const RHFCheckbox = ({ name, label, ...other }: Props) => {
  const { control } = useFormContext();
  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              {...other}
              {...field}
              onChange={(event, checked) => {
                other.onChange != undefined && other?.onChange(event, checked);
                field.onChange(event, checked);
              }}
              checked={field.value}
            />
          )}
        />
      }
    />
  );
};
