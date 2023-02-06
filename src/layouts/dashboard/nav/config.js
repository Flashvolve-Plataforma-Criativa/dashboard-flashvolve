// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Form',
    path: '/dashboard/form',
    icon: icon('ic_form'),
  },
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Usuário',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Produtos',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: '404',
    path: '/404',
    icon: icon('ic_disabled'),
  }
];

export default navConfig;
