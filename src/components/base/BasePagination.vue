<template>
  <paginate
    v-model="page"
    :page-count="totalPage"
    :page-range="3"
    :margin-pages="1"
    :click-handler="clickCallback"
    :prev-text="'Trước'"
    :next-text="'Sau'"
    :container-class="'pagination'"
    :active-class="'active'"
    :page-class="'page-item'"
    :disabled-class="'disabled'"
    :page-link-class="'prev-link-class'"
    :prev-class="'prev-class'"
    :next-class="'next-class'"
  >
  </paginate>
</template>

<script>
export default {
  props: {
    totalPage: Number,
    currPage: Number,
    setCurrPage: Function,
  },

  watch: {
    currPage: function (value) {
      //gán lại curent page khi chọn số lượng bản ghi trên trang mạc định là 1
      this.page = value;
    },
  },

  methods: {
    clickCallback() {
      this.$emit("setCurrPage", this.page);
    },
  },
  data() {
    return {
      page: this.currPage,
    };
  },
};
</script>

<style lang="css">
.pagination {
  display: flex;
  align-items: center;
  color: #000;
}
.page-item {
  padding: 0 6px;
  margin-left: 4px;
  cursor: pointer;
  list-style: none;
}
.page-link-class {
}
.prev-class {
  list-style: none;
  margin-right: 8px;
}
.next-class {
  list-style: none;
  margin-left: 8px;
}
.prev-link-class {
  list-style: none;
  color: #000;
}
.active {
  border: 1px solid #ccc;
}
.disabled {
  opacity: 0.8;
}
</style>
