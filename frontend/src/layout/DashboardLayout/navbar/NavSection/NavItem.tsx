import { Box, ListItemText } from '@mui/material';
import { ListItemStyle, ListItemTextStyle, ListItemIconStyle } from './style';
import { isExternalLink } from '.';
import NextLink from 'next/link';
import Iconify from '@components/Iconfiy';
import { JSX } from 'react';

interface NavItemProps {
  active: boolean;
  open: boolean;
  isCollapse: boolean;
  onOpen: () => void;
  item: NavItem;
}

export function NavItemRoot({ item, isCollapse, open = false, active, onOpen }: NavItemProps) {
  const { title, path, icon, info, children } = item;

  const renderContent = (
    <>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      <ListItemTextStyle disableTypography primary={title} isCollapse={isCollapse} />


      {!isCollapse && (
        <>
          {info && info}
          {children && <ArrowIcon open={open} />}
        </>
      )}
    </>
  );

  if (children) {
    return (
      // <></>
      <ListItemStyle onClick={onOpen} activeRoot={active}>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle LinkComponent={NextLink} to={path} href={path}>
      {renderContent}
    </ListItemStyle>
  ) : (
    <ListItemStyle LinkComponent={NextLink} to={path} href={path} activeRoot={active}>
      {renderContent}
    </ListItemStyle>
  );
}

export function NavItemSub({ item, open = false, active = false, onOpen }: NavItemProps) {
  const { title, path, info, children } = item;

  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemText disableTypography primary={title}/>
      {info && info}
      {children && <ArrowIcon open={open} />}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle LinkComponent={NextLink} to={path} href={path} subItem>
      {renderContent}
    </ListItemStyle>
  ) : (
    // <></>
    <ListItemStyle LinkComponent={NextLink} to={path} href={path} activeSub={active} subItem>
      {renderContent}
    </ListItemStyle>
  );
}

interface DotIconProps {
  active: boolean;
}

export function DotIcon({ active }: DotIconProps) {
  return (
    <ListItemIconStyle>
      <Box
        component='span'
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'text.disabled',
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: 'scale(2)',
            bgcolor: 'primary.main',
          }),
        }}
      />
    </ListItemIconStyle>
  );
}

interface ArrowIconProps {
  open: boolean;
}

export function ArrowIcon({ open }: ArrowIconProps) {
  return (
    <Iconify
      icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      sx={{ width: 16, height: 16, ml: 1 }}
    />
  );
}

export interface NavItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  info?: JSX.Element;
}

export interface NavConfigItem {
  subheader: string;
  items: (NavItem | boolean)[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NavConfig extends Array<NavConfigItem> {}
