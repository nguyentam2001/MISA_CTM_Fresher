<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      color="#ffff"
      :length="totalPage"
      :total-visible="4"
      @input="setCurrentPageOnInput"
    ></v-pagination>
  </div>
</template>
<script>
export default {
  name: "BasePagination",
  props: {
    totalPage: Number,
    currPage: Number,
    setCurrPage: Function,
  },
  watch: {
    //kiểm tra xem trang hiện tại có thay đổi không
    currPage: function (value) {
      this.page = value;
    },
  },
  methods: {
    setCurrentPageOnInput() {
      this.$emit("setCurrPage", this.page);
    },
  },

  data() {
    return {
      value: 1,
      page: this.currPage,
    };
  },
};
</script>
