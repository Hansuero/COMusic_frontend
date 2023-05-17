import register from '../views/register.vue'
import login from '../views/login.vue'
import user from '../views/user.vue'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        name: 'login',
        path: '/login',
        component: login
    },
    {
        name: 'register',
        path: '/register',
        component: register
    },
    {
        name: 'user',
        path: '/user',
        component: user
    }
];
export default routes