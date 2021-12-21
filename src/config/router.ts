import Loadable from 'react-loadable';
import Loading from '@/components/RouteLoading';

const Error = Loadable({
  loader: () => import(/* webpackChunkName:'Dashboard' */ '@/page/notFound'),
  loading: Loading
});
const Home = Loadable({
  loader: () => import(/* webpackChunkName:'Dashboard' */ '@/page/home'),
  loading: Loading
});
const Post = Loadable({
  loader: () => import(/* webpackChunkName:'Dashboard' */ '@/page/post'),
  loading: Loading
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  { path: '/home', component: Home, exact: true },
  { path: '/post/:id', component: Post, exact: false },
  { path: '/error/404', component: Error, exact: false }
];
