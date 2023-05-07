<template>
  <div>
    <van-nav-bar
      style=" position: fixed; width: 100%; z-index: 2;"
      :title="state.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-list style="padding-top: 50px">
      <van-cell
        v-for="(item, index) in state.menu"
        :key="index"
        @click="goImage(item)"
      >
        {{ item.name }}
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
export default {
  setup() {
    const state = reactive({
      title: '',
      menu: [],
    });
    const router = useRouter();
    const route = useRoute();
    onMounted(() => {
      // console.log(window.localStorage.getItem('menu'));
      // let item = JSON.parse(window.localStorage.getItem('menu') || {});
      console.log(route.params.id);
      fetch(`/data/json/${route.params.id}.json`)
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          state.menu = res;
        });
      // state.title = item.title;
      // state.menu = item.menu;
    });
    const goImage = (item) => {
      window.localStorage.setItem(
        'menu',
        JSON.stringify({ menu: item.imgUrl })
      );
       const routerData = router.resolve({
        path: `/look/100`,
      });
      window.open(routerData.href, "_blank");
    };
    const onClickLeft = () => {
      router.go(-1);
    };
    return {
      state,
      onClickLeft,
      goImage,
    };
  },
};
</script>

<style lang="less" scoped>
</style>