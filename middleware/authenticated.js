// 中间件 拦截无权限路由
export default function ({ store, redirect }) {
    // If the user is not authenticated
    if (!store.state.user) {
        return redirect('/login')
    }
}
