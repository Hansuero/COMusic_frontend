import register from '../views/register.vue'
import login from '../views/login.vue'
import user from '../views/user.vue'
import favourite from '../views/favourite.vue'
import interest from '../views/interest.vue'
import result from '../views/result.vue'
import index from '../views/index.vue'
import comment from '../views/comment.vue'
import information from '../views/information.vue'
import manage from '../views/manage.vue'
import record from '../views/record.vue'
import song from '../views/song.vue'
import songlist from '../views/songlist.vue'
import upload from '../views/upload.vue'
import uploaded from '../views/uploaded.vue'

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
    },{
        name: 'comment',
        path: '/comment/:songid',
        component: comment
    },{
        name: 'information',
        path: '/information',
        component: information
    },{
        name: 'manage',
        path: '/manage',
        component: manage
    },{
        name: 'record',
        path: '/record',
        component: record
    },{
        name: 'song',
        path: '/song/:id',
        component: song
    },{
        name: 'songlist',
        path: '/songlist/:id',
        component: songlist
    },{
        name: 'upload',
        path: '/upload',
        component: upload
    },{
        name: 'uploaded',
        path: '/uploaded',
        component: uploaded
    }
];
export default routes
