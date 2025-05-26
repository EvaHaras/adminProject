import { ReactNode, useState } from 'react';

import {
  Box,
  Stack,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
import Iconify from '@components/Iconfiy';
import MenuPopover from '@components/MenuPopover';
import Scrollbar from '@components/Scrollbar';

interface Notification {
  id: string | number;
  avatar: ReactNode | null;
  type: string;
  title: string;
  isUnRead: boolean;
  description: string;
  createdAt: Date;
}

export const _notifications: Notification[] = [...Array(5)].map((_, index) => ({
  id: index,
  title: [
    'Your order is placed',
    'Sylvan King',
    'You have new message',
    'You have new mail',
    'Delivery processing',
  ][index],
  description: [
    'waiting for shipping',
    'answered to your comment on the Minimal',
    '5 unread messages',
    'sent from Guido Padberg',
    'Your order is being shipped',
  ][index],
  avatar: [null, null, null, null, null][index],
  type: ['order_placed', 'friend_interactive', 'chat_message', 'mail', 'order_shipped'][index],
  createdAt: new Date(),
  isUnRead: [true, true, false, false, false][index],
}));

export default function NotificationsPopover() {
  const [openPopover, setOpenPopover] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>(_notifications);
  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClose = () => {
    setOpenPopover(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      })),
    );
  };

  return (
    <>
      <IconButton
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color='error'>
          <Iconify icon='eva:bell-fill' />
        </Badge>
      </IconButton>

      <MenuPopover
        open={Boolean(openPopover)}
        anchorEl={openPopover}
        onClose={handleClose}
        sx={{ width: 360, p: 0 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='subtitle1'>Notifications</Typography>

            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=' Mark all as read'>
              <IconButton color='primary' onClick={handleMarkAllAsRead}>
                <Iconify icon='eva:done-all-fill' />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

interface Props {
  notification: Notification;
}

function NotificationItem({ notification }: Props) {
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{'ava'}</Avatar>
      </ListItemAvatar>

      <ListItemText
        disableTypography
        primary={notification.title}
        secondary={
          <Stack direction='row' sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
            <Iconify icon='eva:clock-fill' width={16} sx={{ mr: 0.5 }} />
            <Typography variant='caption'>{notification.createdAt.toISOString()}</Typography>
          </Stack>
        }
      />
    </ListItemButton>
  );
}
