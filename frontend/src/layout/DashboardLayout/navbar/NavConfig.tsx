import SvgIcon from '@components/SvgIcon';
import { NavConfig } from './NavSection/NavItem';
import { PATH_DASHBOARD } from '@root/utils/paths';

const getIcon = (name: string) => (
  <SvgIcon src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export const ICONS = {
  blog: getIcon('ic_blog'),
  settings: getIcon('ic_settings'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  meter: getIcon('ic_meter'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  job: getIcon('ic_job'),
  file: getIcon('ic_file'),
};

export const navConfig = (): NavConfig => [
  {
    subheader: '',
    items: [{ title: 'Home', path: PATH_DASHBOARD.root, icon: ICONS.analytics }],
  },
  {
    subheader: 'Control',
    items: [
      {
        title: 'Користувачі',
        path: PATH_DASHBOARD.users.root,
        icon: ICONS.user,
        children: [
          { title: 'Список користувачів', path: PATH_DASHBOARD.users.root },
        ],
      },
      {
        title: 'Пости',
        path: PATH_DASHBOARD.applications.root,
        icon: ICONS.dashboard,
        children: [
          { title: 'Список всіх постів', path: PATH_DASHBOARD.applications.root },
          { title: 'Створити пост', path: PATH_DASHBOARD.applications.new },
          { title: 'Пости для адміністраторів', path: PATH_DASHBOARD.applications.admin },
        ],
      },
    ],
  },
];

export default navConfig;
