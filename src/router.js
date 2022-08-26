import Vue from 'vue';
import VueRouter from 'vue-router';
import UserEditor from './components/UserEditor';
import UsersViewer from './components/UsersViewer';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: UsersViewer
  },
  {
    path: '/edit/:id',
    component: UserEditor,
    props: true
  },
  { path: '*', redirect: '/' }
];

export default new VueRouter({
  mode: 'history',
  routes
});
