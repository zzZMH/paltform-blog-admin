import Cookies from 'js-cookie'

const state = {
  mobileWidth: 992,
  title: 'Blog Admin Platform',
  sidebarState: Cookies.get('sidebarState') ? !!+Cookies.get('sidebarState') : true,
  deviceType: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR (state) {
    state.sidebarState = !state.sidebarState
    if (state.sidebarState) {
      Cookies.set('sidebarState', 1)
    } else {
      Cookies.set('sidebarState', 0)
    }
  },
  CLOSE_SIDEBAR: (state) => {
    state.sidebarState = false
    Cookies.set('sidebarState', 0)
  },
  TOGGLE_DEVICE: (state, deviceType) => {
    state.deviceType = deviceType
  }
}

const actions = {
  toggleSideBar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar ({ commit }) {
    commit('CLOSE_SIDEBAR')
  },
  toggleDevice ({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  state,
  mutations,
  actions
}
