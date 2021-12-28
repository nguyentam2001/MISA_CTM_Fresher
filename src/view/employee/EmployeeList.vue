<template>
  <div class="t-content">
    <div class="t-header-content">
      <div class="t-header-content-left">Nhân viên</div>
      <div class="t-header-content-right">
        <div class="t-row">
          <button class="t-btn t-btn-add" @click="showDialogAdd(true)">
            Thêm mới nhân viên
          </button>
        </div>
      </div>
    </div>
    <div class="t-content-body">
      <div class="t-content-body-left">
        <div class="input-search-wrapper">
          <input
            id="searchEmployee"
            type="text"
            class="t-input t-input-search"
            placeholder="Tìm theo mã, tên nhân viên"
            @keyup="searchEmployeeOnKeyup($event)"
            v-model="textSearch"
          />
          <i
            id="searchEmployeeBtn"
            class="fas fa-search"
            @click="searchEmployeeOnClick"
          ></i>
        </div>
        <div
          id="reLoadBtn"
          class="t-content-body-reload"
          @click="loadData"
        ></div>
      </div>

      <!-- custom-table -->
      <table id="tableEmployees" class="t-table" border="1">
        <thead>
          <tr>
            <th class="text-algin-left"></th>
            <th fieldstatus="checkBox">
              <div class="t-table-checks-wrapper">
                <div class="t-table-check"></div>
              </div>
            </th>
            <th fieldvalue="EmployeeCode" class="text-algin-left">
              Mã nhân viên
            </th>
            <th fieldvalue="EmployeeName" class="text-algin-left">
              Tên nhân viên
            </th>
            <th fieldvalue="GenderName" class="text-algin-left">Giới tính</th>
            <th
              fieldvalue="DateOfBirth"
              formattype="date"
              class="text-algin-center"
            >
              Ngày sinh
            </th>
            <th
              fieldvalue="PersonalTaxCode"
              formattype="number"
              class="text-algin-right"
            >
              Số CMND
            </th>
            <th fieldvalue="DepartmentName" class="text-algin-left">
              Chức danh
            </th>
            <th fieldvalue="EmployeePosition" class="text-algin-left">
              Tên đơn vị
            </th>
            <th
              fieldvalue="BankAccountNumber"
              formattype="number"
              class="text-algin-right"
            >
              Số tài khoản
            </th>
            <th fieldvalue="BankName" class="text-algin-left">Ngân hàng</th>
            <th fieldvalue="BankBranchName" class="text-algin-left">
              Chi nhánh ngân hàng
            </th>
            <th fieldfunc="function">Chức năng</th>
            <th class="text-algin-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.EmployeeId">
            <td class="text-algin-left"></td>
            <td fieldstatus="checkBox">
              <div class="t-table-checks-wrapper">
                <div class="t-table-check"></div>
              </div>
            </td>
            <td class="text-algin-left">{{ employee.EmployeeCode }}</td>
            <td class="text-algin-left">{{ employee.EmployeeName }}</td>
            <td class="text-algin-left">{{ employee.GenderName }}</td>
            <td class="text-algin-center">
              {{ commonJS.formatDateDDMMYYYY(employee.DateOfBirth) }}
            </td>
            <td class="text-algin-right">{{ employee.IdentityNumber }}</td>
            <td class="text-algin-left">
              {{ employee.DepartmentName }}
            </td>
            <td class="text-algin-left">{{ employee.PositionName }}</td>
            <td class="text-algin-right">
              {{ employee.BankAccountNumber }}
            </td>
            <td class="text-algin-left">{{ employee.BankName }}</td>
            <td class="text-algin-left">{{ employee.BankBranchName }}</td>
            <td fieldstatus="function">
              <div class="t-row-func">
                <div
                  class="t-row-update"
                  @click="upDateOnclick(employee.EmployeeId)"
                >
                  Sửa
                </div>
                <div class="t-row-more">
                  <div
                    class="t-row-more-down"
                    @click="showListOptionOnClick(employee.EmployeeId, $event)"
                  ></div>
                </div>
              </div>
            </td>
            <td class="text-algin-left"></td>
          </tr>
        </tbody>
      </table>

      <!-- table-after -->
      <!-- footer-page -->
      <div class="t-table-paging-wrapper">
        <div class="t-table-paging">
          <div class="t-table-paging-left">
            <div>
              Tổng số:
              <span class="t-table-paging-sum font-bold">{{
                totalRecord
              }}</span>
              bản ghi
            </div>
          </div>
          <div class="t-table-paging-right">
            <div id="cbxPageSize">
              <base-select :pageSize="pageSize" @setPageSize="setPageSize" />
            </div>
            <div class="t-table-paging-numbers">
              <div>
                <base-pagination
                  :totalPage="totalPage"
                  :currPage="currPage"
                  @setCurrPage="setCurrPage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- footer-page-end -->
    </div>
    <!-- -- list menu xóa-- -->
    <div id="listOption" class="t-row-list" v-bind:style="styleListOption">
      <div class="t-row-item">Nhân bản</div>
      <div id="showPopUpDel" class="t-row-item" @click="showPopupDel">Xóa</div>
      <div class="t-row-item">Ngừng sử dụng</div>
    </div>

    <employee-detail
      :isShowDialogValidate="isShowDialogValidate"
      @setShowDialogValidate="setShowDialogValidate"
      :isShowDialog="isShowDialog"
      @showDialogAdd="showDialogAdd"
      :isEmployeeAdd="isEmployeeAdd"
      :employeeId="employeeId"
      @loadData="loadData"
    />
    <!-- pop up xóa nhân viên -->
    <div id="showDialogDel" class="show-dialog" v-bind:style="showDialogDel">
      <div class="m-dialog">
        <div class="pop-up">
          <div class="pop-up-content">
            <div class="pop-up-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="pop-up-text">
              Bạn có thực sự muốn xóa nhân viên &lt;<span
                class="text-employee-code"
                >NV63572</span
              >&gt; không ?<!--000579-->
            </div>
          </div>
          <div class="pop-up-footer">
            <button
              id="btnCancelPopUpDel"
              class="t-btn btn-cancel"
              @click="hidePopupDelOnClick"
            >
              không
            </button>
            <button
              id="btnDelEmployee"
              class="t-btn t-btn-add"
              @click="delEmployeeOnClick"
            >
              có
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- pop up xóa nhân viên -->
    <!-- po up validate -->
    <div
      class="m-dialog"
      :class="{ isShowDialogValidate: isShowDialogValidate }"
    >
      <div class="pop-up">
        <div class="pop-up-content">
          <div class="pop-up-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="pop-up-text">
            {{ textError }}
          </div>
        </div>
        <div class="pop-up-footer p-flex-end">
          <button class="t-btn t-btn-add" @click="hidePopupValidate">
            Đóng
          </button>
        </div>
      </div>
    </div>
    <!-- po up validate -->
  </div>
</template>
<script>
import EmployeeDetail from "./EmployeeDetail.vue";
import axios from "axios";
import CommonJS from "../../script/base/Common.js";
import BaseSelect from "../../components/base/BaseSelect.vue";
import BasePagination from "../../components/base/BasePagination.vue";
export default {
  created() {
    /**
     * Lấy thông tin nhân viên
     * create by: NVTAM: (25/12/2021)
     */
    this.loadData();
    /**
     * Add sự kiên cho window
     * create by: NVTAM: (25/12/2021)
     */
  },
  mounted() {
    let me = this;
    window.addEventListener("click", (e) => {
      // if the clicked element is not option btn => close menu
      if (
        !e.target.classList.contains("t-row-more-down") &&
        !e.target.classList.contains("t-row-list")
      ) {
        me.styleListOption.display = "none";
      }
    });
  },
  components: {
    EmployeeDetail,
    BaseSelect,
    BasePagination,
  },
  methods: {
    hidePopupValidate() {
      this.isShowDialogValidate = true;
    },
    showDialogAdd(value) {
      this.isShowDialog = value;
      //Biến check xem có nhấn vào nút add không
      this.isEmployeeAdd = value;
    },
    setShowDialogValidate({ value, text }) {
      console.log(value, text);
      this.isShowDialogValidate = value;
      this.textError = text;
    },
    loadData() {
      let me = this;
      let urlApi = `http://amis.manhnv.net/api/v1/Employees/filter?pageSize=${this.pageSize}&pageNumber=${this.currPage}&employeeFilter=${this.textSearch}`;

      axios
        .get(urlApi)
        .then(function (response) {
          // handle success
          console.log(response.data);
          me.employees = response.data.Data;
          me.totalRecord = response.data.TotalRecord;
          me.totalPage = response.data.TotalPage;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    upDateOnclick(employeeId) {
      //Hiện dialog nhân viên
      this.isShowDialog = true;
      //Gán id Nhân viên cần update
      this.employeeId = `${employeeId}`;
    },
    //Hiển thị option xóa
    showListOptionOnClick(employeeId, event) {
      //Xét tọa độ cho element list option
      let toLeft = `${event.clientX - 110}px`;
      let toTop = `${event.clientY + 6}px`;
      this.styleListOption.left = toLeft;
      this.styleListOption.top = toTop;
      this.styleListOption.display = "block";
      //Xét id nhân viên được chọn
      this.employeeId = employeeId;
    },
    //Hiển thị pop up xóa
    showPopupDel() {
      this.showDialogDel.display = "block";
    },
    //Ẩn form xóa
    hidePopupDelOnClick() {
      this.showDialogDel.display = "none";
    },
    //Xóa thông tin nhân viên onClick
    delEmployeeOnClick() {
      let me = this;
      axios
        .delete(`http://amis.manhnv.net/api/v1/Employees/${me.employeeId}`)
        .then(function (response) {
          //Ẩn pop up xóa
          me.showDialogDel.display = "none";
          //Load lại dữ liệu
          me.loadData();
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    //Tìm kiếm nhân viên on key up
    searchEmployeeOnKeyup(event) {
      if (event.keyCode == 13) {
        this.loadData();
      }
    },
    //Tìm kiếm nhân viên khi click
    searchEmployeeOnClick() {
      this.loadData();
    },
    //xét lại số bản ghi trên một trang
    setPageSize(value) {
      this.pageSize = value;
      //set lại trang hiện tại =1
      this.currPage = 1;
      //load lại trang web
      this.loadData();
    },
    //set lại trang hiện tại
    setCurrPage(value) {
      this.currPage = value;
      //load lại trang web
      this.loadData();
    },
  },

  data() {
    return {
      isShowDialog: false,
      employees: [],
      commonJS: CommonJS,
      isEmployeeAdd: false,
      employeeId: null,
      styleListOption: {
        left: "",
        top: "",
        display: "none",
      },
      showDialogDel: {
        display: "none",
      },
      textSearch: "",
      totalRecord: null,
      pageSize: 25,
      totalPage: null,
      currPage: 1,
      isShowDialogValidate: true,
      textError: "",
    };
  },
};
</script>
