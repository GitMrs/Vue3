const state = {
  value: ''
}
const mutations = {
  SET_VALUE:(state, val) => {
    state.value = val;
  }
}
const actions = {
  setValue:({commit} ,val) => {
    commit('SET_VALUE', val)
  }
} 
export default {
  namespaced: true,
  state,
  mutations,
  actions
}