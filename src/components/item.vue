<template>
  <div class="item">
    <reImg :url="item.cover" />
    <div class="desc" @click="detail">
      <h2 class="van-ellipsis">{{ item.title }}</h2>
      <p>{{ item.tip }}</p>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import reImg from "./Reimg.vue";
export default {
  name: "HelloWorld",
  components: {
    reImg,
  },
  props: {
    item: Object,
  },
  setup(props) {
    const router = useRouter();
    const detail = () => {
      const routerData = router.resolve({
        path: `/detail/${props.item.href.split("/")[2]}`,
      });
      window.open(routerData.href, "_blank");
    };
    return {
      detail,
    };
  }
};
</script>
<style lang="less" scoped>
.item {
  display: flex;
  .van-image {
    flex-shrink: 0;
  }
  .desc {
    overflow: hidden;
  }
}
</style>
