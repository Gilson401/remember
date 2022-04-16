import Vue from 'vue'
export const state = () => {
    return {
        // mode: 'quest',
        showModal: false,
        modalImage: '',
        modalImages: [],
        items: [],
        disponibleTags: [],
        showMetaData: true,
        sorting: 'memoryPoints',
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
    SET_SHOW_METADATA(state, value) {
        state.showMetaData = value
    },

    SET_SHOW_MODAL(state, mode) {
        state.showModal = mode
    },
    SET_SHOW_MODAL_IMAGE(state, image) {
        state.modalImage = image
    },

    SET_SHOW_MODAL_IMAGES(state, images) {
        state.modalImages = images
    },

    SET_ITEMS(state, items) {
        state.items = items
    },

    DELETE_ITEM(state, id) {
        const index = state.items.findIndex((i) => i.id === id)
        if (index >= 0) state.items.splice(index, 1)
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

        const data = await this.$api.$get('remember')

        commit('SET_ITEMS', data)

    },

    async create({ commit }, payload) {
        const persistedQuestion = await this.$api.post(
            'remember',
            payload
        )
        const data = persistedQuestion.data
        commit('ADD_ITEM', data)
        commit('SET_LAST_PERSISTED_ITEM', data)
    },

    async updateQuestMemoryPoint({ commit }, payload) {

        const updated = await this.$api.patch(`remember/${payload._id}`, {
            ...payload
        })

        commit('ADD_ITEM', updated.data)
        commit('SET_LAST_PERSISTED_ITEM', updated.data)

    },
    async update({ commit }, payload) {
        try {
            const updated = await this.$api.patch(`remember/${payload._id}`, {
                ...payload
            })

            commit('ADD_ITEM', updated.data)
            commit('SET_LAST_PERSISTED_ITEM', updated.data)
        } catch (error) {
            alert(`Não foi possível atualizar  ${payload._id}`)
        }
    },
    async deleteQuestItem({ commit }, id) {
        await this.$api.delete(`remember/${id}`)
        commit('DELETE_ITEM', id)
    }

}

export const getters = {
    getMetadataMode(state) {
        return state.showMetaData
    },

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
    },
    getQuestionsByLongVisited(state) {

        function getNumberOfDays(start, end) {
            const date1 = new Date(start);
            const date2 = new Date(end);

            // One day in milliseconds
            const oneDay = 1000 * 60 * 60 * 24;

            // Calculating the time difference between two dates
            const diffInTime = date2.getTime() - date1.getTime();

            // Calculating the no. of days between two dates
            const diffInDays = Math.round(diffInTime / oneDay);

            return diffInDays;
        }

        function trataItem(item) {

            if (!item.lastDayVisited) {
                item.lastDayVisited = '2022-03-01'
            }

            item.daysLong = getNumberOfDays(item.lastDayVisited, Date.now())
            return item
        }

        return state.items.map((i) => trataItem(i)).sort(function (a, b) {
            if (a.daysLong > b.daysLong) {
                return -1;
            }
            if (a.daysLong < b.daysLong) {
                return 1;
            }
            return 0;
        });

    }
}