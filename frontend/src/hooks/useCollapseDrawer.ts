
import { CollapseDrawerContext } from '@root/context/CollapseDrawerContext';
import { useContext } from 'react';

const useCollapseDrawer = () => {
  const context = useContext(CollapseDrawerContext);
  if (!context) throw new Error('CollapseDrawerContext must be use inside CollapseDrawerProvider');
  return context;
};

export default useCollapseDrawer;