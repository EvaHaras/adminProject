import { useState } from 'react';
import { List, Collapse } from '@mui/material';
import { NavItem, NavItemRoot, NavItemSub } from './NavItem';
import { usePathname } from 'next/navigation';
import { getActive } from '.';

interface NavListProps {
  isCollapse: boolean;
  list: NavItem;
}

export function NavListRoot({ list, isCollapse }: NavListProps) {
  const pathname = usePathname();
  const active = getActive(list.path, pathname);
  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemRoot
          item={list}
          isCollapse={isCollapse}
          active={active}
          open={open}
          onOpen={() => setOpen(!open)}
        />
        {!isCollapse && (
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {(
                list.children?.filter((elem) => typeof elem !== 'boolean' && elem !== undefined) ||
                []
              ).map((item) => (
                <NavListSub key={item.title} list={item} isCollapse={isCollapse} />
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return (
    <NavItemRoot
      item={list}
      active={active}
      isCollapse={isCollapse}
      open={open}
      onOpen={() => setOpen(!open)}
    />
  );
}

interface NavListSubProps {
  list: NavItem;
  isCollapse: boolean;
}

function NavListSub({ list, isCollapse }: NavListSubProps) {
  const pathname = usePathname();
  const active = getActive(list.path, pathname);
  const [open, setOpen] = useState(active);
  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemSub
          item={list}
          onOpen={() => setOpen(!open)}
          open={open}
          active={active}
          isCollapse={isCollapse}
        />
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding sx={{ pl: 3 }}>
            {(list.children || []).map((item) => (
              <NavItemSub
                key={item.title}
                item={item}
                isCollapse={isCollapse}
                open={open}
                onOpen={() => setOpen(!open)}
                active={getActive(item.path, pathname)}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <NavItemSub
      item={list}
      active={active}
      open={open}
      isCollapse={isCollapse}
      onOpen={() => setOpen(!open)}
    />
  );
}
