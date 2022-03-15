export const state = () => {
    return {
        mode: 'quest',
        showModal: false,
        modalImage: '',
    }
}

export const mutations = {
    SET_MODE(state, mode) {
        state.mode = mode
    },
    SET_SHOW_MODAL(state, mode) {
        state.showModal = mode
    },
    SET_SHOW_MODAL_IMAGE(state, image) {
        state.modalImage = image
    },

}

export const actions = {

}

export const getters = {

}