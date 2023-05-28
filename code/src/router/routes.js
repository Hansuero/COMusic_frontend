import register from '../views/register.vue'
import login from '../views/login.vue'
import user from '../views/user.vue'
import favourite from '../views/favourite.vue'
import interest from '../views/interest.vue'
import result from '../views/result.vue'
import index from '../views/index.vue'

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
        path: '/user/:id',
        component: user
    },{
        name: 'favourite',
        path: '/favourite',
        component: favourite
    },{
        name: 'interest',
        path: '/interest',
        component: interest
    },{
        name: 'result',
        path: '/result',
        component: result
    },{
        name: 'index',
        path: '/index',
        component: index
    }
];
export default routes