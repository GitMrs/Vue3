<template>
  <div>
    <van-search
      style="position: fixed; width: 100%; z-index: 2; right: 0"
      v-model="value"
      placeholder="请输入搜索关键词"
      input-align="center"
    ></van-search>
    <div class="layout">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item
        icon="home-o"
        v-for="(item, index) in navData"
        :key="index"
        :icon="item.icon"
        :to="item.path"
      >
        {{ item.name }}
      </van-tabbar-item>
      <!-- <van-tabbar-item icon="search">更新</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const value = ref("");
    const active = ref(0);
    const store = useStore();
    watch(value, (val) => {
      store.dispatch("search/setValue", val);
    });
    const navData = [
      {
        name: "全部",
        path: "book",
        icon: "home-o",
      },
      {
        name: "更新",
        path: "update",
        icon: "search",
      },
    ];
    return {
      value,
      active,
      navData,
    };
  },
};
</script>

<style scoped>
.layout {
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
