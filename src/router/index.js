
import { createRouter, createWebHashHistory } from 'vue-router'

import Signin from '@/views/Signin.vue'
import Dashboard from '@/views/Dashboard.vue'


const routes = [
    {path: '/', name: 'Dashboard', component: Dashboard},
    {path: '/signin', name: 'Signin', component: Signin},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router