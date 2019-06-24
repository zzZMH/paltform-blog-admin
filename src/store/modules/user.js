import Cookies from 'js-cookie'

const state = {
  token: Cookies.get('userToken'),
  userName: '',
  userRole: 'visitor'
}

const mutations = {
  SET_USERTOKEN (state, userToken) {
    state.token = userToken
    Cookies.set('userToken', userToken)
  },
  REMOVE_USERTOKEN (state) {
    state.token = ''
    Cookies.remove('userToken')
  },
  SET_USERNAME (state, userName) {
    state.userName = userName
  }
}

const actions = {
  setUserToken ({ commit }, userToken) {
    commit('SET_USERTOKEN', userToken)
  },
  removeUserToken ({ commit }) {
    commit('REMOVE_USERTOKEN')
  },
  setUserName ({ commit }, userName) {
    commit('SET_USERNAME', userName)
  }
}

export default {
  state,
  mutations,
  actions
}
