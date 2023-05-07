<template>
  <van-image
    :src="isLoad ? url : loadUrl"
    @click="reloadImg"
    :width="width"
    :height="height"
    lazy-load
    fit="contain"
  />
</template>

<script>
import { computed, ref } from "vue";
export default {
  name: "ReImg",
  props: {
    url: String,
    width: {
      type: String,
      default: "100px",
    },
    height: {
      type: String,
      default: "100px",
    },
  },
  setup(props) {
    const isLoad = ref(true);
    const loadUrl = ref(props.url);
    const width = props.width;
    const height = props.height;
    const reloadImg = () => {
      isLoad.value = false;
      if (props.url.includes("?")) {
        const loadUrl = props.url.split("?")[0];
        loadUrl.value = orginUrl + "?random=" + Math.random();
      } else {
        loadUrl.value = loadUrl.value + "?random=" + Math.random();
      }
    };
    // const imgUrl = computed(url, (url) => {
    //   return url;
    // });
    return {
      loadUrl,
      isLoad,
      width,
      height,
      reloadImg,
    };
  },
};
</script>

<style></style>
