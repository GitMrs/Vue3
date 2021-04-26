<template>
  <div>
    <van-list
      class="layout"
      v-model:loading="state.loading"
      v-model:error="state.error"
      error-text="请求失败，点击重新重新加载"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in state.list" :key="index">
        <ListItem :item="item" />
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import ListItem from "../components/item.vue";
import { useGetData } from '../usehook/getData';

export default {
  components: {
    ListItem,
  },
  setup() {
    const {state, onLoad} = useGetData('update');
    return {
      state,
      onLoad,
    };
  },
};
</script>

<style scoped></style>
