import { reactive, watch, onMounted } from "vue";
import { useStore } from "vuex";
export const useGetData = (path) => {
  let allData = [];
  let selectData = [];
  const store = useStore();
  const state = reactive({
    list: [],
    page: 10,
    num: 0,
    error: false,
    loading: false,
  });
  const onLoad = () => {
    state.num++;
    state.loading = true;
    if (store.getters.value) {
      getData(selectData);
    } else {
      getData(allData);
    }
  };
  const getData = (data) => {
    state.list = data.slice(0, (state.num + 1) * state.page);
    state.loading = false;
  };
  const _get = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        allData = res;
        getData(res);
      });
  };
  onMounted(() => {
    _get(`/data/${path}.json`);
  });

  watch(
    () => store.getters.value,
    (val) => {
      state.loading = true;
      state.num = 0;
      selectData = allData.filter((item) => item.title.includes(val));
      getData(selectData);
    }
  );
  return {
    onLoad,
    state,
  };
};
