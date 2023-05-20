import register from '../views/register.vue'
import login from '../views/login.vue'
import user from '../views/user.vue'
import favourite from '../views/favourite.vue'
import interest from '../views/interest.vue'

const routes = [{
        path: '/',
        redirect: '/login'
    },{
        name: 'login',
        path: '/login',
        component: login
    },{
        name: 'register',
        path: '/register',
        component: register
    },{
        name: 'user',
        path: '/user',
        component: user
    },{
        name: 'favourite',
        path: '/favourite',
        component: favourite
    },{
        name: 'interest',
        path: '/interest',
        component: interest
    }
];
export default routes