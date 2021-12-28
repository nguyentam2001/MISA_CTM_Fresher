<template>
  <v-combobox
    v-model="select"
    :items="items"
    solo
    @change="setValueOnChange"
  ></v-combobox>
</template>
<script>
import axios from "axios";
export default {
  props: {
    setValueInCombobox: Function,
    department: Object,
    isShowDialog: Boolean,
  },
  watch: {
    //kiểm tra giá trị ẩn hiện dialog
    isShowDialog: function () {
      if (this.department.text == null) {
        this.select = { text: "", value: "" };
      }
    },
  },
  created() {
    let me = this;
    axios
      .get("http://amis.manhnv.net/api/v1/Departments")
      .then(function (response) {
        // handle success
        for (const item of response.data) {
          let objItem = {};
          //định nghĩa ừng thuộc tính của object item
          objItem.text = item.DepartmentName;
          objItem.value = item.DepartmentId;
          //push vào items
          me.items.push(objItem);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },
  methods: {
    setValueOnChange() {
      this.$emit("setValueInCombobox", this.select);
    },
  },

  data() {
    return {
      select: {},
      items: [],
    };
  },
};
</script>

<style scoped></style>
