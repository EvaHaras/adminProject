/* eslint-disable react-hooks/rules-of-hooks */
import useMediaQuery from '@mui/material/useMediaQuery';
import { Breakpoint, useTheme } from '@mui/material/styles';


export default function useResponsive(
  query: 'up' | 'down' | 'between' | 'only',
  key: Breakpoint,
  start?: Breakpoint,
  end?: Breakpoint,
) {
  const theme = useTheme();

  switch (true) {
    case query === 'up':
      return useMediaQuery(theme.breakpoints.up(key));
    case query === 'down':
      return useMediaQuery(theme.breakpoints.down(key));
    case query === 'between':
      return useMediaQuery(theme.breakpoints.between(start!, end!));
    case query === 'only':
      return useMediaQuery(theme.breakpoints.only(key));
    default:
      return null;
  }
}