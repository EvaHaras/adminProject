import React, { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Autocomplete,
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';

interface SelectableItem {
  title: string;
  value: string | number;
}

interface Props extends Omit<TextFieldProps, 'name'> {
  name: string;
  // eslint-disable-next-line no-unused-vars
  groupBy?: ((option: SelectableItem) => string) | undefined;
  // eslint-disable-next-line no-unused-vars
  onSelectAuto?: (item: SelectableItem | null) => void;
  options: SelectableItem[];
  isLoading?: boolean;
}

export default function RHFAutocomplete({
  name,
  options,
  helperText,
  isLoading = false,
  onSelectAuto,
  groupBy,
  ...other
}: Props) {
  const { control, resetField } = useFormContext();
  const [filteredOptions, setFilteredOptions] = useState<SelectableItem[]>(options);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleFilterOptions = (inputValue: string) => {
    if (inputValue.length < 3) {
      setFilteredOptions(options);
      return;
    }
    setFilteredOptions(
      options.filter((option) => option.title.toLowerCase().includes(inputValue.toLowerCase())),
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, onChange, value, ...field }, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          fullWidth
          options={filteredOptions}
          getOptionLabel={(option) => option.title}
          renderOption={(props, option) => (
            <Box
              {...props}
              sx={{
                borderRadius: '8px',
                margin: '5px',
              }}
              key={option.value}
              value={option.value}
              component='li'
            >
              {option.title}
            </Box>
          )}
          noOptionsText={'Відсутні елементи для відображення'}
          value={filteredOptions.find(({ value: fval }) => value === fval) || null}
          groupBy={groupBy ? groupBy : () => ''}
          onInputChange={(event, value) => handleFilterOptions(value)}
          onChange={(_, item) => {
            if (onSelectAuto) onSelectAuto(item);
            onChange(item?.value);
            resetField('objectId');
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...other}
              fullWidth
              error={!!error || !!other.error}
              inputRef={ref}
              className='dark:[&>label]:text-textSecondary [&_.MuiSelect-select]:text-textSecondaryDark dark:[&_.MuiSelect-select]:text-textSecondary [&_svg]:fill-mainBlack dark:[&_svg]:fill-textSecondary dark:[&_textarea]:text-textSecondary'
              helperText={error?.message ?? helperText}
              FormHelperTextProps={{
                className: 'dark:text-textSecondary',
              }}
              InputProps={{
                ...params.InputProps,
                ...other.InputProps,
                autoComplete: 'disabled',
                endAdornment: (
                  <>
                    {params.InputProps.endAdornment}
                    {isLoading && (
                      <InputAdornment position='end'>
                        {<CircularProgress color='inherit' size={20} />}
                      </InputAdornment>
                    )}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
}
