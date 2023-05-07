<template>
  <div>
    <van-nav-bar
      style="position: fixed; width: 100%; z-index: 2"
      :title="state.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-list style="padding-top: 50px">
      <!-- <van-image
        v-for="(item, index) in state.menu"
        :key="index"
        src="http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg?x-oss-process=image/resize,m_pad,h_100,w_100"
        width="100%"
        fit="contain"
      /> -->
      <!-- <van-image
        v-for="(item, index) in state.menu"
        :key="index"
        :src="item.url"
        @click="reloadImg"
        lazy-load
        :width="state.width + '%'"
        fit="contain"
      /> -->
      <re-img  v-for="(item, index) in state.menu" :url="item.url" :width="state.width + '%'" :height="'auto'" />
    </van-list>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import ReImg from '../components/Reimg.vue';
export default {
  /**
   * https://pic.xiximh.com/static/upload/book/549/20888/967059.jpg
   */
  components: {
    ReImg
  },
  setup() {
    const state = reactive({
      title: "",
      menu: [],
      width: "100",
    });
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      // console.log(window.localStorage.getItem('menu'));
      let item = JSON.parse(window.localStorage.getItem("menu") || {});
      state.menu = item.menu;
      state.width = route.params.width;
    });
    const onClickLeft = () => {
      router.go(-1);
    };
    return {
      state,
      onClickLeft,
    };
  },
};
</script>

<style lang="less" scoped></style>
