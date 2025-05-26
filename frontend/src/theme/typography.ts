
const FONT_PRIMARY = 'var(--font-proximanova-variable)';

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 400,
  fontWeightBold: 400,
  h1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: '2rem',
    letterSpacing: '0.9%',
  },
  h2: {
    fontWeight: 600,
    lineHeight: '33.6px',
    fontSize: '1.5rem',
    letterSpacing: '0.5%',
  },
  h3: {
    fontWeight: 400,
    lineHeight: '28px',
    fontSize: '1.25rem',
    letterSpacing: '0.5%',
  },
  h4: {
    fontWeight: 400,
    lineHeight: '25.2px',
    fontSize: '1.125rem',
    letterSpacing: '0.5%',
  },
  h5: {
    fontWeight: 400,
    lineHeight: '22.4px',
    fontSize: '1rem',
    letterSpacing: '0.5%',
  },
  h6: {
    fontWeight: 400,
    lineHeight: '20px',
    fontSize: '0.875rem',
    letterSpacing: '0.5%',
  },
  subtitle1: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: '1rem',
  },
  subtitle2: {
    fontWeight: 400,
    lineHeight: 22 / 14,
    fontSize: '0.875rem',
  },
  body1: {
    lineHeight: 1.5,
    fontSize: '1rem',
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: '0.875rem',
  },
  caption: {
    lineHeight: 1.5,
    fontSize: '0.75rem',
  },
  overline: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: '0.75rem',
    textTransform: 'capitalize' as const,
  },
  button: {
    fontWeight: 400,
    lineHeight: 24 / 14,
    fontSize: '0.875rem',
    textTransform: 'none' as const,
  },
};

export default typography ;
