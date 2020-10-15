import { random } from 'lodash'

const startingPoint = 0
const endingPoint = 90

const defaultDuration = 8000
const defaultInterval = 50

const variation = 0.5

const state = {
  loading: false,
  visible: false,
  progress: startingPoint,
  timeout: null
}

const mutations = {
  SET_LOADING (state, val) {
    state.loading = val
  },
  SET_VISIBLE (state, val) {
    state.visible = val
  },
  SET_PROGRESS (state, val) {
    state.progress = val
  },
  CLEAR_TIMEOUT (state) {
    if (state.timeout) {
      clearTimeout(state.timeout)
    }
    state.timeout = null
  },
  SET_TIMEOUT (state, val) {
    state.timeout = val()
  }
}

const actions = {
  start ({ commit, dispatch }) {
    commit('SET_LOADING', true)
    commit('SET_VISIBLE', true)
    commit('SET_PROGRESS', startingPoint)

    dispatch('loop')
  },
  loop ({ commit, state, dispatch }) {
    commit('CLEAR_TIMEOUT')
    if (state.progress >= endingPoint) {
      return
    }
    const size = (endingPoint - startingPoint) / (defaultDuration / defaultInterval)
    const p = Math.round(state.progress + random(size * (1 - variation), size * (1 + variation)))
    commit('SET_PROGRESS', Math.min(p, endingPoint))

    const delay = random(defaultInterval * (1 - variation), defaultInterval * (1 + variation))
    const dp = dispatch

    const timer = () => setTimeout(() => { dp('loop') }, delay)
    commit('SET_TIMEOUT', timer)
  },
  stop ({ commit }) {
    commit('SET_LOADING', false)
    commit('SET_PROGRESS', 100)
    commit('CLEAR_TIMEOUT')

    const c = commit
    setTimeout(() => {
      c('SET_VISIBLE', false)
    }, 200)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
