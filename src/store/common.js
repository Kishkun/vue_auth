export default {
  state: () => ({
    isLoading: false,
    error: null,
  }),
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    setLoading({commit}, payload) {
      commit('setLoading', payload)
    },
    setError({commit}, payload) {
      commit('setError', payload)
    },
    clearError({commit}) {
      commit("setError")
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    },
    error(state) {
      return state.error
    }
  }
}
