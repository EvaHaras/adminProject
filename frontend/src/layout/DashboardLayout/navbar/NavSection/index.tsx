import { Box, List, ListSubheader, styled } from '@mui/material';
import { NavListRoot } from './NavList';
import type { NavConfig, NavItem } from './NavItem';
import { matchPath } from 'react-router-dom';

interface Props {
  navConfig: NavConfig;
  isCollapse: boolean;
}

export function isExternalLink(path?: string) {
  return path?.includes('http');
}

// export function getActive(path: string, pathname: string) {
//   if (path === '/' && pathname !== '/') return false;
//   return path ?  : false;//false;  //path ? !!matchPath({ path, end: false }, pathname) : false;
// }


export function getActive(path: string, pathname: string) {
  if (path === '/' && pathname !== '/') return false;
  return path ? !!matchPath({ path, end: false }, pathname) : false;
}


export default function NavSection({ navConfig, isCollapse, ...other }: Props) {
  return (
    <Box {...other}>
      {navConfig
        .filter((elem) => elem?.items)
        .map((group) => (
          <List key={group.subheader} disablePadding sx={{ px: 2 }}>
            <ListSubheaderStyle
              disableSticky
              sx={{
                ...(isCollapse && {
                  opacity: 0,
                }),
              }}
            >
              {group.subheader}
            </ListSubheaderStyle>
            {group.items
              .filter((elem) => typeof elem !== 'boolean' && elem !== undefined)
              .map((list) => (
                <NavListRoot
                  key={(list as NavItem).title}
                  list={list as NavItem}
                  isCollapse={isCollapse}
                />
              ))}
          </List>
        ))}
    </Box>
  );
}

export const ListSubheaderStyle = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));
