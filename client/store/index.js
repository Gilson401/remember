export const strict = false

export const actions = {
    async nuxtServerInit({ dispatch }) {
        await dispatch('display/index')
    }
}