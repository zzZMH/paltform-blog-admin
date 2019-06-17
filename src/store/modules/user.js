import Cookies from 'js-cookie'

const state = {
  userRole: 'visitor'
}

const mutations = {
  GET_USERROLE (state) {
    state.userRole = Cookies.get('userRole') ? Cookies.get('userRole') : 'visitor'
  }
}

const actions = {
  getUserRole ({ commit }) {
    commit('GET_USERROLE')
  }
}

export default {
  state,
  mutations,
  actions
}
