import { Popover, PaperProps, SxProps } from '@mui/material';

interface Props {
  sx?: SxProps;
  children?: React.ReactNode;
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  PaperProps?: PaperProps;
}

export default function MenuPopover({ children, sx, open, anchorEl, onClose, ...other }: Props) {
  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
          overflow: 'inherit',
          ...sx,
        },
      }}
      {...other}
    >
      {children}
    </Popover>
  );
}