'use client';

import { createTheme } from '@mui/material/styles';

import overrides from './overrides';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import shadows from './shadows';

const theme = createTheme({
    cssVariables: true,
    palette: palette,
    typography,
    breakpoints,
    shape: { borderRadius: 8 },
    shadows: shadows,
});
theme.components = overrides(theme);

export default theme;