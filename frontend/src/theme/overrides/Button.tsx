import { Theme } from '@mui/material/styles';

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          color: theme.palette.primary.contrastText,
        
          boxShadow: theme.shadows[0],
          backgroundColor:theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
        containedPrimary: {
          boxShadow: theme.shadows[0],
        },
        containedSecondary: {
          boxShadow: theme.shadows[0],
        },
        containedInfo: {
          boxShadow: theme.shadows[0],
        },
        containedSuccess: {
          boxShadow: theme.shadows[0],
        },
        containedWarning: {
          boxShadow: theme.shadows[0],
        },
        containedError: {
          boxShadow: theme.shadows[0],
        },
        // outlined
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[300]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
