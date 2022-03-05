<template>
  <div class="t-content">
    <div class="t-header-content">
      <div class="t-header-content-left">Nhân viên</div>
      <div class="t-header-content-right">
        <div class="t-row">
          <button
            title="Thêm mới nhân viên"
            class="t-btn t-btn-add"
            @click="showDialogAdd(true)"
          >
            Thêm mới nhân viên
          </button>
        </div>
      </div>
    </div>
    <div class="t-content-body">
      <div class="t-content-body-left">
        <div class="t-options-left">
          <div class="btn-delete-selection" @click="showPopupDelSelected">
            Thực hiện hàng loạt<span class="btn-select-icon"></span>
          </div>
        </div>
        <div class="t-options-right">
          <div class="input-search-wrapper">
            <input
              id="searchEmployee"
              type="text"
              title="Tìm kiếm theo tên, mã nhân viên"
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

          <div class="btn-export-excel" @click="exportExcel"></div>
        </div>
      </div>

      <!-- custom-table -->
      <table id="tableEmployees" class="t-table" border="1">
        <thead>
          <tr>
            <th class="text-algin-left"></th>
            <th fieldstatus="checkBox">
              <div class="t-table-checks-wrapper">
                <input
                  type="checkbox"
                  class="m-icon-checkbox"
                  name="tableRowCheck"
                  @click="checkAllOnClick"
                  v-model="isCheckAll"
                />
                <label class="display-label"></label>
              </div>
            </th>
            <th fieldvalue="EmployeeCode" class="text-algin-left min-width-174">
              Mã nhân viên
            </th>
            <th fieldvalue="EmployeeName" class="text-algin-left min-width-174">
              Tên nhân viên
            </th>
            <th fieldvalue="GenderName" class="text-algin-left">Giới tính</th>
            <th
              fieldvalue="DateOfBirth"
              formattype="date"
              class="text-algin-center min-width-120"
            >
              Ngày sinh
            </th>
            <th
              title="Số chứng minh nhân dân"
              fieldvalue="PersonalTaxCode"
              formattype="number"
              class="text-algin-right min-width-174"
            >
              Số CMND
            </th>
            <th
              fieldvalue="DepartmentName"
              class="text-algin-left min-width-200"
            >
              Chức danh
            </th>
            <th
              fieldvalue="EmployeePosition"
              class="text-algin-left min-width-200"
            >
              Tên đơn vị
            </th>
            <th
              fieldvalue="BankAccountNumber"
              formattype="number"
              class="text-algin-right min-width-174"
            >
              Số tài khoản
            </th>
            <th fieldvalue="BankName" class="text-algin-left min-width-174">
              Ngân hàng
            </th>
            <th
              fieldvalue="BankBranchName"
              class="text-algin-left min-width-250"
            >
              Chi nhánh ngân hàng
            </th>
            <th fieldfunc="function">Chức năng</th>
            <th class="text-algin-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.employeeId">
            <td class="text-algin-left"></td>
            <td fieldstatus="checkBox">
              <div class="t-table-checks-wrapper">
                <input
                  type="checkbox"
                  class="m-icon-checkbox"
                  name="tableRowCheck"
                  v-model="checkedIds"
                  :value="employee.employeeId"
                />
              </div>
            </td>
            <td class="text-algin-left">{{ employee.employeeCode }}</td>
            <td class="text-algin-left">{{ employee.employeeName }}</td>
            <td class="text-algin-left">
              {{ commonJS.genderName(employee.gender) }}
            </td>
            <td class="text-algin-center">
              {{ commonJS.formatDateDDMMYYYY(employee.dateOfBirth) }}
            </td>
            <td class="text-algin-right">{{ employee.identityNumber }}</td>
            <td class="text-algin-left">
              {{ employee.departmentName }}
            </td>
            <td class="text-algin-left">{{ employee.employeePosition }}</td>
            <td class="text-algin-right">
              {{ employee.bankAccountNumber }}
            </td>
            <td class="text-algin-left">{{ employee.bankName }}</td>
            <td class="text-algin-left">{{ employee.bankBranchName }}</td>
            <td fieldstatus="function">
              <div class="t-row-func">
                <div
                  class="t-row-update"
                  @click="upDateOnclick(employee.employeeId)"
                >
                  Sửa
                </div>
                <div class="t-row-more">
                  <div
                    class="t-row-more-down"
                    @click="
                      showListOptionOnClick(
                        employee.employeeId,
                        employee.employeeCode,
                        $event
                      )
                    "
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
      <div class="t-row-item" @click="replicationOnClick(3)">Nhân bản</div>
      <div id="showPopUpDel" class="t-row-item" @click="showPopupDel">Xóa</div>
      <div class="t-row-item">Ngừng sử dụng</div>
    </div>

    <employee-detail
      :isShowDialogValidate="isShowDialogValidate"
      :isShowDialogEmpty="isShowDialogEmpty"
      @setShowDialogValidate="setShowDialogValidate"
      :isShowDialog="isShowDialog"
      @showDialogAdd="showDialogAdd"
      :isEmployeeAdd="isEmployeeAdd"
      :employeeId="employeeId"
      @loadData="loadData"
      :stateForm="stateForm"
    />
    <!-- pop up xóa nhân viên -->
    <div id="showDialogDel" class="show-dialog" v-bind:style="showDialogDel">
      <div class="m-dialog">
        <div class="pop-up">
          <div class="pop-up-content">
            <div class="pop-up-icon">
              <div class="warning-icon"></div>
            </div>
            <div class="pop-up-text">
              Bạn có thực sự muốn xóa nhân viên &lt;<span
                class="text-employee-code"
                >{{ employeeCodeDel }}</span
              >&gt; không ?<!--000579-->
            </div>
          </div>
          <div class="pop-up-footer">
            <button
              title="Không"
              id="btnCancelPopUpDel"
              class="t-btn btn-cancel"
              @click="hidePopupDelOnClick"
            >
              Không
            </button>
            <button
              id="btnDelEmployee"
              class="t-btn t-btn-add"
              @click="delEmployeeOnClick"
            >
              Có
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- pop up xóa nhân viên -->
    <!-- po up validate MÃ nhân viên -->
    <div
      class="m-dialog"
      :class="{ isShowDialogValidate: isShowDialogValidate }"
    >
      <div class="pop-up">
        <div class="pop-up-content">
          <div class="pop-up-icon">
            <div class="warning-icon"></div>
          </div>
          <div class="pop-up-text error_text">
            {{ textError }}
          </div>
        </div>
        <div class="pop-up-footer p-flex-end">
          <button class="t-btn t-btn-add" @click="hidePopupValidate">
            Đồng ý
          </button>
        </div>
      </div>
    </div>
    <!-- po up validate -->
    <!-- pop up validate Để trống tên và ngày phòng ban -->
    <div id="showDialogEmpty" :class="{ isShowDialogEmpty: isShowDialogEmpty }">
      <div class="m-dialog">
        <div class="pop-up">
          <div class="pop-up-content">
            <div class="pop-up-icon">
              <div class="icon-empty"></div>
            </div>
            <div class="pop-up-text">
              {{ textError }}
            </div>
          </div>
          <div class="pop-up-footer p-flex-center">
            <button class="t-btn t-btn-add" @click="hidePopupValidate">
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- pop up xóa nhiều nhân viên -->
    <div id="ShowDelSelected" :class="{ isShowDelSelected: isShowDelSelected }">
      <div class="m-dialog">
        <div class="pop-up">
          <div class="pop-up-content">
            <div class="pop-up-icon">
              <div class="warning-icon"></div>
            </div>
            <div class="pop-up-text">
              Bạn có thực sự muốn xóa {{ checkedIds.length }} nhân viên đã chọn
              không?
            </div>
          </div>
          <div class="pop-up-footer">
            <button class="t-btn btn-cancel" @click="hidePopupDeleteSelected">
              Không
            </button>
            <button class="t-btn t-btn-add" @click="confirmDeleteSelect">
              Có
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- toast messenger -->
    <v-snackbar
      v-model="snackbar"
      :timeout="500"
      :right="true"
      :light="true"
      width="200"
    >
      <template>
        <div class="snackbar-flex">
          <div class="toast-messenger-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div color="black">{{ textSuccess }}</div>
          <div class="toast-messenger-cancel"></div>
        </div>
      </template>
    </v-snackbar>
    <!-- po up validate -->
    <base-loading :overlay="overlay" />
    <!-- thực hiện xóa tất cả -->
    <div
      v-bind:style="styleDelSelected"
      @click="deleteSelectOnClick"
      class="popup-del-selected"
    >
      Xóa
    </div>
  </div>
</template>
<script>
import EmployeeDetail from "./EmployeeDetail.vue";
import axios from "axios";
import CommonJS from "../../script/base/common.js";
import RootApi from "../../script/base/api.js";
import BaseSelect from "../../components/base/BaseSelect.vue";
import BasePagination from "../../components/base/BasePagination.vue";
import BaseLoading from "../../components/base/BaseLoading.vue";
import Resouces from "../../script/base/resouces.js";
export default {
  created() {
    /**
     * Lấy thông tin nhân viên
     * create by: NVTAM: (25/12/2021)
     */
    this.loadData();
  },
  /**
   * Add sự kiên cho window
   * create by: NVTAM: (25/12/2021)
   */
  mounted() {
    let me = this;
    window.addEventListener("click", (e) => {
      // if the clicked element is not option btn => close menu
      if (
        !e.target.classList.contains("t-row-more-down") &&
        !e.target.classList.contains("t-row-list") &&
        // đóng popup xóa hàng loạt lại nếu không nhấn vào
        !e.target.classList.contains("btn-delete-selection") &&
        !e.target.classList.contains("popup-del-selected")
      ) {
        me.styleListOption.display = "none";
        me.styleDelSelected.display = "none";
      }
    });
  },
  components: {
    EmployeeDetail,
    BaseSelect,
    BasePagination,
    BaseLoading,
  },
  methods: {
    /**
     * Nhân bản bản ghi
     * author: NVTAM (29/12/2021)
     */
    replicationOnClick(value) {
      //Hiện dialog nhân viên
      this.isShowDialog = true;
      this.stateForm = value;
    },
    /**
     * Ẩn popup validate
     * author: NVTAM (29/12/2021)
     */
    hidePopupValidate() {
      this.isShowDialogValidate = true;
      this.isShowDialogEmpty = false;
    },
    /**
     *Hiển thị form nhập thông tin
     * author: NVTAM (29/12/2021)
     */
    showDialogAdd(value) {
      //reset lại state form
      if (!value) {
        this.stateForm = null;
      }
      //reset employee id
      this.employeeId = null;
      this.isShowDialog = value;
      //Biến check xem có nhấn vào nút add không
      this.isEmployeeAdd = value;
    },
    /**
     *set giá trị validate
     * author: NVTAM (29/12/2021)
     */
    setShowDialogValidate({ value, text, isValEmpty }) {
      if (isValEmpty) {
        this.isShowDialogEmpty = isValEmpty;
      } else {
        this.isShowDialogValidate = value;
      }
      this.textError = text;
    },
    /**
     *load dữ liệu
     * author: NVTAM (29/12/2021)
     */
    loadData() {
      let me = this;
      let urlApi = `${RootApi.employee}/filter?pageSize=${this.pageSize}&pageNumber=${this.currPage}&specs=${this.textSearch}`;
      //hiển thị overlay
      this.overlay = true;
      axios
        .get(urlApi)
        .then(function (response) {
          // handle success
          me.employees = response.data.data;
          me.totalRecord = response.data.totalRecord;
          me.totalPage = response.data.totalPage;
          //reset lại employeeID thành null
          me.employeeId = null;
          //ẩn overlay
          me.overlay = false;
        })
        .catch(function () {});
    },
    /**
     *Hiển thị update nhân viên
     * author: NVTAM (29/12/2021)
     */
    upDateOnclick(employeeId) {
      //Hiện dialog nhân viên
      this.isShowDialog = true;
      //Gán id Nhân viên cần update
      this.employeeId = `${employeeId}`;
    },
    /**
     *Hiển thị option xóa
     * author: NVTAM (29/12/2021)
     */
    showListOptionOnClick(employeeId, employeeCode, event) {
      //Xét tọa độ cho element list option
      let toLeft = `${event.clientX - 110}px`;
      let toTop = `${event.clientY + 6}px`;
      this.styleListOption.left = toLeft;
      this.styleListOption.top = toTop;
      this.styleListOption.display = "block";
      //Xét id và mã nhân viên được chọn
      this.employeeId = employeeId;
      this.employeeCodeDel = employeeCode;
    },
    /**
     *Hiển thị popup xóa theo lựa chọn
     * author: NVTAM (29/12/2021)
     */
    showPopupDelSelected() {
      if (this.checkedIds.length > 0) {
        //Hiện popup xóa theo lựa chọn
        this.styleDelSelected.left = `292px`;
        this.styleDelSelected.top = `180px`;
        this.styleDelSelected.display = "block";
      }
    },

    /**
     *Hiển thị pop up xóa
     * author: NVTAM (29/12/2021)
     */

    showPopupDel() {
      this.showDialogDel.display = "block";
    },

    /**
     *Ẩn form xóa
     * author: NVTAM (29/12/2021)
     */
    hidePopupDelOnClick() {
      this.showDialogDel.display = "none";
    },
    /**
     *Xóa thông tin nhân viên onClick
     * author: NVTAM (29/12/2021)
     */
    delEmployeeOnClick() {
      let me = this;
      axios
        .delete(`${RootApi.employee}/${me.employeeId}`)
        .then(function (response) {
          //Ẩn pop up xóa
          me.showDialogDel.display = "none";
          //Load lại dữ liệu
          me.loadData();
          console.log(response);
          me.snackbar = true;
          me.textSuccess = Resouces.Messenger.DeleteSuccess;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    /**
     *Tìm kiếm nhân viên on key up
     * author: NVTAM (29/12/2021)
     */
    searchEmployeeOnKeyup(event) {
      if (event.keyCode == 13) {
        this.loadData();
      }
    },
    /**
     *Tìm kiếm nhân viên khi click icon
     * author: NVTAM (29/12/2021)
     */
    searchEmployeeOnClick() {
      this.loadData();
    },
    //xét lại số bản ghi trên một trang khi chọn combobox selected
    setPageSize(value) {
      this.pageSize = value;
      //set lại trang hiện tại =1
      this.currPage = 1;
      //load lại trang web
      this.loadData();
    },
    /**
     *set lại trang hiện tại ở phân trang
     * author: NVTAM (29/12/2021)
     */
    setCurrPage(value) {
      this.currPage = value;
      //load lại trang web
      this.loadData();
    },
    /**
     * Check tất cả hoặc bỏ check tất cả
     * Author: NVTAM (10/1/2022)
     */
    checkAllOnClick() {
      if (!this.isCheckAll) {
        this.checkedIds = [];
        for (const employee of this.employees) {
          this.checkedIds.push(employee.employeeId);
        }
      } else {
        if (this.checkedIds.length > 0) {
          this.checkedIds = [];
        }
      }
    },
    /**
     * Thực hiện xóa hàng loạt onClick
     * Athor:NVTAM (10/1/2022)
     */
    deleteSelectOnClick() {
      // //Hiển thị form xác nhận xóa hàng loạt
      this.isShowDelSelected = true;
    },
    /**
     * Ẩn xóa hàng loạt onClick
     * Athor:NVTAM (10/1/2022)
     */
    hidePopupDeleteSelected() {
      this.isShowDelSelected = false;
    },

    /**
     * Export Excel
     * Athor:NVTAM (10/1/2022)
     */
    exportExcel() {
      window.location.href = `${RootApi.employee}/export?pageSize=${this.pageSize}&pageNumber=${this.currPage}&specs=${this.textSearch}`;
    },

    /**
     * Xác nhận xóa hàng loạt onClick
     * Athor:NVTAM (10/1/2022)
     */
    confirmDeleteSelect() {
      let me = this;
      axios
        .delete(`${RootApi.employee}/ids`, {
          data: me.checkedIds,
        })
        .then(function (response) {
          me.loadData();
          //Ẩn form show dialog deleted
          me.isShowDelSelected = false;
          console.log(response);
          me.snackbar = true;
          me.textSuccess = Resouces.Messenger.DeleteSuccess;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
  },
  watch: {
    checkedIds: function (value) {
      //Kiểm tra sự thay đổi của mảng checkedIds nếu ít nhất 1 dòng không check
      //=> checkAll=false
      if (value.length != this.employees.length) {
        this.isCheckAll = false;
      }
    },
  },

  data() {
    return {
      isShowDialog: false,
      employees: [],
      commonJS: CommonJS,
      isEmployeeAdd: false,
      employeeId: null,
      employeeCodeDel: "",
      styleListOption: {
        left: "",
        top: "",
        display: "none",
      },
      styleDelSelected: {
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
      totalPage: 0,
      currPage: 1,
      isShowDialogValidate: true,
      textError: "",
      isShowDialogEmpty: false,
      isShowDelSelected: false,
      overlay: false,
      snackbar: false,
      textSuccess: "",
      stateForm: null,
      checkedIds: [],
      isCheckAll: false,
    };
  },
};
</script>
