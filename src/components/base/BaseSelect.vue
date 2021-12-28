<template>
  <v-select
    :items="items"
    @change="setValueOnChange"
    v-model="value"
    solo
  ></v-select>
</template>
<script>
export default {
  props: {
    setPageSize: Function,
    pageSize: Number,
  },
  methods: {
    setValueOnChange() {
      let me = this;
      this.$emit("setPageSize", me.value);
    },
  },
  data() {
    return {
      value: { text: "25 bản ghi trên trang", value: this.pageSize },
      items: [
        {
          text: "25 bản ghi trên trang",
          value: 25,
        },
        {
          text: "20 bản ghi trên trang",
          value: 20,
        },
        {
          text: "15 bản ghi trên trang",
          value: 15,
        },
        {
          text: "10 bản ghi trên trang",
          value: 10,
        },
        {
          text: "5 bản ghi trên trang",
          value: 5,
        },
      ],
    };
  },
};
</script>
