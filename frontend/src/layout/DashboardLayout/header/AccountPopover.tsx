import { useState } from 'react';
import { SxProps, Theme, alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, IconButton, } from '@mui/material';
import MenuPopover from '@root/components/MenuPopover';
import NextLink from 'next/link';
// import Avatar from '@components/Avatar';
// import useSession from '@hooks/useSession';
// import { AccountService } from '@root/openapi';
import { useRouter } from 'next/navigation';
import { PATH_AUTH } from '@root/utils/paths';

interface Props {
  sx?: SxProps;
}

export default function AccountPopover({ sx }: Props) {
  // const { account } = useSession();
  const { push } = useRouter();

  const [open, setOpen] = useState<null | HTMLElement>(null);

  const MENU_OPTIONS = [
    { label: 'Головна', linkTo: '/' },
    { label: 'Налаштування', linkTo: '/settings' },
  ];

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
   push(PATH_AUTH.signIn)
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme: Theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {/* {account ? (
          <Avatar text={`${account.firstName.at(0)}${account.lastName.at(0)}`.toUpperCase()} />
        ) : (
          <Skeleton variant={'circular'} width={40} height={40} />
        )} */}
      </IconButton>
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
          ...sx,
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          {/* {account ? ( */}
            {/* <> */}
              <Typography variant='subtitle2' noWrap>
                account.firstName account.lastName
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
                account.email
              </Typography>
            {/* </>
          // ) : (
          //   <Skeleton
          //     variant={'rectangular'}
          //     sx={{ width: 1, height: 44, borderRadius: 1, mt: 0.5 }}
          //   />
          // )} */}
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              href={option.linkTo}
              component={NextLink}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          {'Вийти'}
        </MenuItem>
      </MenuPopover>
    </>
  );
}
