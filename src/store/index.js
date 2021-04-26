import {createStore} from 'vuex';
import search from './modules/search';
import getters from './getters';
const store = createStore({
  modules: {
    search
  },
  getters
});
export default store;