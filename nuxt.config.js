export default {
    router: {
        // 路由激活类名配置，精确匹配
        linkExactActiveClass: 'active',
        extendRoutes(routes, resolve) {
            // 删除原来的路由
            routes.splice(0)
            //自定义路由
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout/'),
                    children: [
                        {
                            path: '',
                            name: 'home',
                            component: resolve(__dirname, 'pages/home/')
                        },
                        {
                            path: '/login',
                            name: 'login',
                            component: resolve(__dirname, 'pages/login/')
                        },
                        {
                            path: '/register',
                            name: 'register',
                            component: resolve(__dirname, 'pages/login/')
                        },
                        {
                            path: '/profile/:username',
                            name: 'profile',
                            component: resolve(__dirname, 'pages/profile/')
                        },
                        {
                            path: '/settings',
                            name: 'settings',
                            component: resolve(__dirname, 'pages/settings/')
                        },
                        {
                            path: '/editor',
                            name: 'editor',
                            component: resolve(__dirname, 'pages/editor/')
                        },
                        {
                            path: '/article/:slug',
                            name: 'article',
                            component: resolve(__dirname, 'pages/article/')
                        }
                    ]
                }
            ])
        }
    },
    server: {
        host: '0.0.0.0',
        port: 80
    },
    // 注册插件
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ]
}