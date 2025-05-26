import { Palette, Theme } from '@mui/material/styles';

export default function ButtonGroup(theme: Theme) {
  const styleContained = (color: keyof Palette) => ({
    props: { variant: 'contained', color },
    style: { boxShadow: theme.shadows[8] },
  });

  return {
    MuiButtonGroup: {
      variants: [
        {
          props: { variant: 'contained', color: 'inherit' },
          style: { boxShadow: theme.shadows[8] },
        },
        styleContained('primary'),
        styleContained('secondary'),
        styleContained('info'),
        styleContained('success'),
        styleContained('warning'),
        styleContained('error'),

        {
          props: { disabled: true },
          style: {
            boxShadow: 'none',
            '& .MuiButtonGroup-grouped.Mui-disabled': {
              color: theme.palette.action.disabled,
              borderColor: `${theme.palette.action.disabledBackground} !important`,
              '&.MuiButton-contained': {
                backgroundColor: theme.palette.action.disabledBackground,
              },
            },
          },
        },
      ],

      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  };
}
