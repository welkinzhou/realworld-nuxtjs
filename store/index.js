// 判断是否服务端
const cookieparser = process.server ? require('cookieparser') : undefined
// 服务端渲染期间运行的都是一个实例
// 为了防止数据冲突，必须要将 state 定义为一个函数，返回数据对象
export const state = () => {
    return {
        // 当前用户信息
        user: null
    }
}
export const mutations = {
    setUser(state, info) {
        state.user = info
    }
}
export const actions = {
    // Nuxt 提供的 hook，会在服务端渲染期间自动调用
    // 同步数据
    nuxtServerInit({ commit }, { req }) {
        let info = null
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                info = JSON.parse(parsed.user)
            } catch (err) {
                // No valid cookie found
            }
        }
        // 提交 mutation
        commit('setUser', info)
    }
}
