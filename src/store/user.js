import axios from 'axios';

export default {
  state: () => ({
    users: null,
    token: localStorage.getItem('token') || null,
  }),
  mutations: {
    addUser(state, payload) {
      state.token = payload.token;
      state.users = payload.user;
    },
    logout(state) {
      state.token = null;
      state.users = null
    }
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('clearError');
        commit('setLoading', true);
        axios({url: 'http://localhost:8080/login', data: user, method: 'POST'})
          .then(res => {
            const token = res.data.token;
            const user = res.data.user;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            commit('addUser', token, user);
            resolve(res);
          })
          .catch(err => {
            commit('setError', true);
            localStorage.removeItem('token');
            reject(err);
          });
        commit('setLoading', false);
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('clearError');
        axios({url: 'http://localhost:3000/register', data: user, method: 'POST' })
          .then(res => {
            const token = res.data.token;
            const user = res.data.user;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            commit('addUser', token, user);
            resolve(res)
          })
          .catch(err => {
            commit('setError', true);
            localStorage.removeItem('token');
            reject(err);
          });
        commit('setLoading', false);
      })
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        resolve()
      })
    }
  },
  getters: {
    users(state) {
      return state.users
    }
  }
}
