
import { createRouter, createWebHashHistory } from 'vue-router'

import Signin from '@/views/Signin.vue'
import Dashboard from '@/views/Dashboard.vue'


const routes = [
    {path: '/', name: 'Signin', component: Signin},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router