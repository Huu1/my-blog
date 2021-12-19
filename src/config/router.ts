import Loadable from 'react-loadable';
import Loading from '@/components/RouteLoading';

const Home = Loadable({
  loader: () => import(/* webpackChunkName:'Dashboard' */ '@/page/home'),
  loading: Loading
});
const Post = Loadable({
  loader: () => import(/* webpackChunkName:'Dashboard' */ '@/page/post'),
  loading: Loading
});
// const Author = Loadable({
//   loader: () => import(/* webpackChunkName:'Dashboard' */ 'Src/views/Author'),
//   loading: Loading,
// });
// const Test = Loadable({
//   loader: () => import(/* webpackChunkName:'Dashboard' */ 'Src/views/Test'),
//   loading: Loading,
// });
// const Error = Loadable({
//   loader: () => import(/* webpackChunkName:'Dashboard' */ 'Src/components/404'),
//   loading: Loading,
// });
// const Article = Loadable({
//   loader: () => import(/* webpackChunkName:'Dashboard' */ 'Src/views/Article'),
//   loading: Loading,
// });

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  { path: '/home', component: Home },
  { path: '/post/:id', component: Post }
  // { path: '/author', component: Author },
  // { path: '/test', component: Test },
  // { path: '/login', component: Login },
  // { path: '/error/404', component: Error },
];
