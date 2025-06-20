'use client';

import { forwardRef } from 'react';
import NextLink from 'next/link';
import { useTheme } from '@mui/material/styles';
import { Box, SxProps } from '@mui/material';
import { ROOT_PATH } from '@root/utils/paths';

interface Props {
  disabledLink?: boolean;
  disableText?: boolean;
  sx?: SxProps;
}

// eslint-disable-next-line react/display-name
const Logo = forwardRef(({ disabledLink = false, disableText = false, sx }: Props, ref) => {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;

  const logo = (
    <Box ref={ref} sx={{ width: !disableText? 140  : 40, height: 40, cursor: 'pointer', ...sx }}>
      {!disableText ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
          viewBox='0 0 283 64'
          fill='none'
        >
          <path
            d='M141.04 16C130 16 122.04 23.2 122.04 34C122.04 44.8 131 52 142.04 52C148.71 52 154.59 49.36 158.23 44.91L150.58 40.49C148.56 42.7 145.49 43.99 142.04 43.99C137.25 43.99 133.18 41.49 131.67 37.49H159.69C159.91 36.37 160.04 35.21 160.04 33.99C160.04 23.2 152.08 16 141.04 16ZM131.58 30.5C132.83 26.51 136.25 24 141.03 24C145.82 24 149.24 26.51 150.48 30.5H131.58ZM248.72 16C237.68 16 229.72 23.2 229.72 34C229.72 44.8 238.68 52 249.72 52C256.39 52 262.27 49.36 265.91 44.91L258.26 40.49C256.24 42.7 253.17 43.99 249.72 43.99C244.93 43.99 240.86 41.49 239.35 37.49H267.37C267.59 36.37 267.72 35.21 267.72 33.99C267.72 23.2 259.76 16 248.72 16ZM239.27 30.5C240.52 26.51 243.94 24 248.72 24C253.51 24 256.93 26.51 258.17 30.5H239.27ZM200.24 34C200.24 40 204.16 44 210.24 44C214.36 44 217.45 42.13 219.04 39.08L226.72 43.51C223.54 48.81 217.58 52 210.24 52C199.19 52 191.24 44.8 191.24 34C191.24 23.2 199.2 16 210.24 16C217.58 16 223.53 19.19 226.72 24.49L219.04 28.92C217.45 25.87 214.36 24 210.24 24C204.17 24 200.24 28 200.24 34ZM282.72 5V51H273.72V5H282.72ZM36.95 0L73.9 64H0L36.95 0ZM129.33 5L101.62 53L73.91 5H84.3L101.62 35L118.94 5H129.33ZM188.24 17V26.69C187.24 26.4 186.18 26.2 185.04 26.2C179.23 26.2 175.04 30.2 175.04 36.2V51H166.04V17H175.04V26.2C175.04 21.12 180.95 17 188.24 17Z'
            fill={PRIMARY_MAIN}
          />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='100%'
          height='100%'
          viewBox='0 0 74 64'
          fill='none'
        >
          <path
            d='M 36.95 0 L 73.9 64 L 0 64 L 36.95 0 Z'
            fill={PRIMARY_MAIN}
          />
        </svg>
      )}
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <NextLink href={ROOT_PATH}>{logo}</NextLink>;
});

export default Logo;