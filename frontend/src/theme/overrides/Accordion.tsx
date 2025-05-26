import type { Theme } from '@mui/material/styles';

export default function Accordion(theme: Theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&.Mui-expanded': {
            // boxShadow: theme.shadows[1],
            // borderRadius: theme.shape.borderRadius,
            margin: 0,
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
          },
          '&::before': {
            display: 'none',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          '&.Mui-disabled': {
            opacity: 1,
            color: theme.palette.action.disabled,
            '& .MuiTypography-root': {
              color: 'inherit',
            },
          },
        },
        expandIconWrapper: {
          color: 'inherit',
        },
      },
    },
  };
}
