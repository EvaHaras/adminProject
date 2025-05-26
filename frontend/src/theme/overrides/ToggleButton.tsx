import { Theme } from '@mui/material/styles';

export default function ToggleButton(theme: Theme) {
  return {
    MuiToggleButton: {
      variants: [
        {
          style: {
            '&.Mui-selected': {
              backgroundColor: theme.palette.action.selected,
            },
          },
        },
      ],
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          border: `solid 1px ${theme.palette.grey[500]}`,
          '& .MuiToggleButton-root': {
            margin: 4,
            borderColor: 'transparent !important',
            borderRadius: `${theme.shape.borderRadius}px !important`,
          },
        },
      },
    },
  };
}
