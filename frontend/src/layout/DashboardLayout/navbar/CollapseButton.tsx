import { Box, IconButton, Theme, useTheme } from '@mui/material';

interface Props {
  collapseClick?: boolean;
  onToggleCollapse: () => void;
}

export default function CollapseButton({ onToggleCollapse, collapseClick }: Props) {
  const theme = useTheme();
  return (
    <IconButton onClick={onToggleCollapse}>
      <Box
        sx={{
          lineHeight: 0,
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(collapseClick && {
            transform: 'rotate(180deg)',
          }),
        }}
      >
        {icon(theme)}
      </Box>
    </IconButton>
  );
}

const icon = (theme: Theme) => (
  <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
    <g fill='none' fillRule='evenodd'>
      <path d='M0 0h24v24H0z' />
      <g fill={theme.palette.primary.main} fillRule='nonzero'>
        <path
          d='M14.3283 11.4343 18.5126 7.25c.4142-.4142.4142-1.0858 0-1.5-.4142-.4142-1.0858-.4142-1.5 0l-5.543 5.5429c-.3904.3905-.3904 1.0237 0 1.4142l5.543 5.5429c.4142.4142 1.0858.4142 1.5 0 .4142-.4142.4142-1.0858 0-1.5l-4.1843-4.1843a.8.8 0 0 1 0-1.1314Z'
          opacity='.48'
        />
        <path d='M8.3283 11.4343 12.5126 7.25c.4142-.4142.4142-1.0858 0-1.5-.4142-.4142-1.0858-.4142-1.5 0l-5.543 5.5429c-.3904.3905-.3904 1.0237 0 1.4142l5.543 5.5429c.4142.4142 1.0858.4142 1.5 0 .4142-.4142.4142-1.0858 0-1.5l-4.1843-4.1843a.8.8 0 0 1 0-1.1314Z' />
      </g>
    </g>
  </svg>
);
