import { Theme } from '@mui/material/styles';

export default function Popover(theme: Theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: theme.shadows[1],
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
        },
      },
    },
  };
}
