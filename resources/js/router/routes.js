export default [
    {
        path: '/login',
        name: 'login',
        meta: { middleware: "guest" },
        component: () => import ('../views/pages/auth/login.vue')
    },
    {
        path: '/',
        name: 'home',
        meta: { middleware: "auth" },
        component: () => import ('../views/pages/dashboard/index.vue')
    },
    {
        path: '/showData',
        name: 'data',
        meta: { middleware: "auth" },
        component: () => import ('../views/pages/dashboard/showData.vue')
    },
]
