import Vue from 'vue'
export const state = () => {
    return {
        mode: 'quest',
        showModal: false,
        modalImage: '',
        items: [],
        disponibleTags: [],
        speakMode: true,
        lastPersistedItem: {},
        currentTest: {
            questionsQtd: 0,
            totalAnswered: 0,
            rightAnswers: 0,
            wrongAnswers: 0
        }
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
    SET_ITEMS(state, items) {
        state.items = items
    },

    DELETE_ITEM(state, items) {
        state.items = items
    },

    UPDATE_ITEM(state, items) {
        state.items = items
    },
    ADD_ITEM(state, item) {
        const index = state.items.findIndex((i) => i._id === item._id)
        if (index >= 0) {
            Vue.set(state.items, index, item)
        } else {
            state.items.push(item)
        }
    },
    SET_LAST_PERSISTED_ITEM(state, item) {
        state.lastPersistedItem = item
    },

    SET_CURRENT_TEST(state, data) {
        state.currentTest = {
            ...state.currentTest,
            ...data
        }
    }

}

export const actions = {

    async index({ commit }) {

        const data = await this.$axios.$get('http://localhost:3010/remember')

        commit('SET_ITEMS', data)

    },

    async create({ commit }, payload) {
        const persistedQuestion = await this.$axios.post(
            'http://localhost:3010/remember',
            payload
        )
        const data = persistedQuestion.data
        commit('ADD_ITEM', data)
        commit('SET_LAST_PERSISTED_ITEM', data)
    },

    async updateQuestMemoryPoint({ commit }, value, item) {
        try {
            const updated = await this.$axios.patch(`http://localhost:3010/remember/${item._id}`, {
                memory: value + item.memory
            })

            if (value > 0) {
                this.answerState = 'right'
            } else {
                this.answerState = 'wrong'
            }

            commit('UPDATE_ITEM', updated)
            commit('SET_LAST_PERSISTED_ITEM', updated)

        } catch (error) {
            alert(`Não foi possível atualizar  ${item._id}`)
        }
    },
    async update({ commit }, payload) {
        try {
            const updated = await this.$axios.patch(`http://localhost:3010/remember/${payload._id}`, {
                ...payload
            })

            commit('ADD_ITEM', updated.data)
            commit('SET_LAST_PERSISTED_ITEM', updated.data)
        } catch (error) {
            alert(`Não foi possível atualizar  ${payload._id}`)
        }
    },
    async deleteQuestItem({ commit }, id) {
        try {
            await this.$axios.delete(`http://localhost:3010/remember/${id}`)

            commit('DELETE_ITEM', id)
        } catch (error) {
            alert(`Não foi possível deletar  ${id}`)
        }
    }

}

export const getters = {

    disponibleTags(state) {
        let tags = []
        state.items.forEach((item) => {
            tags = tags.concat(item.assunto)
        })

        return [...new Set(tags)].sort()
    },
    tagsAndMemoryPointAlphabetical(state, getters) {
        const rankItem = {}

        getters.disponibleTags.forEach((item) => {
            const questionsWithTag = state.items.filter((itemQuest) =>
                itemQuest.assunto.includes(item)
            )

            rankItem[item] = questionsWithTag.reduce(
                (acc, quest) => acc + quest.memory,
                0
            )
        })
        return Object.entries(rankItem)
    },
    tagsSortedByMemoryPoint(state, getters) {
        const rankItem = {}

        getters.disponibleTags.forEach((item) => {
            const questionsWithTag = state.items.filter((itemQuest) =>
                itemQuest.assunto.includes(item)
            )

            rankItem[item] = questionsWithTag.reduce(
                (acc, quest) => acc + quest.memory,
                0
            )
        })
        return Object.entries(rankItem).sort(function (a, b) {
            if (a[1] > b[1]) {
                return 1
            }
            if (a[1] < b[1]) {
                return -1
            }
            return 0
        })
    }
}