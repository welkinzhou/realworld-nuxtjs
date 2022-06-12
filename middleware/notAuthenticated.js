// 已登录不能访问登录或注册页面
export default function ({ store, redirect }) {
    // If the user is authenticated redirect to home page
    if (store.state.user) {
        return redirect('/')
    }
}