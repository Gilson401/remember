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
        },
        params: {
            page: 1,
            limit: 10,
        },
        page: 1,
        stop: false,
        paginationData: {}
    }
}

export const mutations = {

    SET_PAGE_LIMIT(state, limit) {
        state.params = {
            ...state.params,
            limit
        }
    },

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
        const index = state.items.findIndex((i) => i._id === id)
        if (index >= 0) {
            state.items.splice(index, 1)
        }
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
    },
    SET_PARAMS(state, data) {
        state.params = data
    },

    RESET_ITEMS(state) {
        state.items = []
    },

    SET_PAGE(state, page) {
        state.page = page
    },

    SET_STOP(state, stop) {
        state.stop = stop
    },
    SET_PAGINATION_DATA(state, paginationData) {
        state.paginationData = paginationData
    },
}

export const actions = {

    async index({ state, commit }) {
        const data = await this.$api.$get('remember')
        commit('SET_ITEMS', data)
    },


    async indexPaginate({ state, commit }) {

        const data = await this.$api.$get('management', {
            params: state.params,
        })
        commit('SET_ITEMS', data.docs)
        const { totalDocs, limit, totalPages, page, pagingCounter,
            hasPrevPage, hasNextPage, prevPage, nextPage } = data

        commit('SET_PAGINATION_DATA', { totalDocs, limit, totalPages, page, pagingCounter, hasPrevPage, 
            hasNextPage, prevPage, nextPage })

    },

    reset({ commit }) {
        commit('RESET_ITEMS')
        commit('SET_PAGE', 1)
        commit('SET_STOP', false)
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
    getItems(state) {
        return state.items
    },
    getPaginationData(state) {
        return state.paginationData
    },
    getParams(state) {
        return state.params
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