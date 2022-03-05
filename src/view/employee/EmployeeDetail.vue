<template>
  <div>
    <div
      id="showDialog"
      class="show-dialog"
      :class="{ isShowDialog: isShowDialog }"
    >
      <div class="m-dialog">
        <div class="m-dialog-wrapper">
          <div class="form-employee m-with-auto">
            <div class="pop-up m-with-auto pop-up-form">
              <div class="pop-up-top-left">
                <button class="btn-top-left btn-question">
                  <div class="btn-question-icon"></div>
                </button>
                <button
                  id="btnEscape"
                  @click="btnCancelEmployee"
                  class="btn-top-left btn-escape"
                >
                  <div class="btn-times-icon"></div>
                </button>
              </div>
              <div class="pop-up-header">
                <p class="pop-up-title">Thông tin nhân viên</p>
                <div class="pop-up-checks">
                  <div class="pop-up-check">
                    <input type="checkbox" class="m-icon-checkbox" />
                    <label class="display-label"></label>
                  </div>
                  <p>Là khách hàng</p>
                  <div class="pop-up-check">
                    <input type="checkbox" class="m-icon-checkbox" />
                    <label class="display-label"></label>
                  </div>
                  <p>Là nhà cung cấp</p>
                </div>
              </div>
              <div class="pop-up-content m-with-auto">
                <div class="m-row">
                  <div class="m-col-6">
                    <div class="m-row">
                      <div class="m-col-5 m-padding-right-8">
                        <div class="input-wrapper">
                          <p class="text">
                            Mã <span class="color-red">*</span>
                          </p>
                          <input
                            type="text"
                            class="t-input"
                            ref="isFocus"
                            placeholder="Nhập mã nhân viên"
                            fieldname="EmployeeCode"
                            v-model="employee.employeeCode"
                            id="employeeCode"
                          />
                        </div>
                      </div>
                      <div class="m-col-7 m-padding-right-8">
                        <div class="input-wrapper">
                          <p class="text">
                            Tên <span class="color-red">*</span>
                          </p>

                          <input
                            :class="{ isFullNameEmpty: isFullNameEmpty }"
                            type="text"
                            class="t-input"
                            :title="setTitle"
                            placeholder="Nhập tên nhân viên"
                            @input="hideErrorOninputName()"
                            fieldname="EmployeeName"
                            validate="FullName"
                            v-model="employee.employeeName"
                            id="FullName"
                          />

                          <div class="error-message">
                            Tên không được để trống
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="m-col-6">
                    <div class="m-row">
                      <div class="m-col-5 m-padding-left-8">
                        <div class="input-wrapper">
                          <p class="text">Ngày sinh</p>
                          <input
                            type="date"
                            class="t-input"
                            placeholder="DD/MM/YYYY"
                            fieldname="DateOfBirth"
                            v-model="employee.dateOfBirth"
                          />
                        </div>
                      </div>
                      <div class="m-col-7 m-padding-left-8">
                        <div class="t-row">
                          <p class="text">Giới tính</p>

                          <div class="input-radio-wrapper">
                            <label for="male">
                              <input
                                type="radio"
                                name="Gender"
                                value="1"
                                id="male"
                                checked
                                v-model="employee.gender"
                              />
                              <span>Nam</span>
                            </label>
                            <label for="female">
                              <input
                                type="radio"
                                name="Gender"
                                value="0"
                                id="female"
                                v-model="employee.gender"
                              />
                              <span>Nữ</span></label
                            >
                            <label for="other">
                              <input
                                type="radio"
                                name="Gender"
                                value="2"
                                id="other"
                                v-model="employee.gender"
                              />
                              <span>Khác</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="m-row m-margin-top-16">
                  <div class="m-col-6 m-padding-right-8">
                    <div class="t-row">
                      <p class="text">
                        Đơn vị <span class="color-red">*</span>
                      </p>

                      <v-combobox
                        :class="{ isDepartmentEmpty: isDepartmentEmpty }"
                        v-model="select.text"
                        :items="items"
                        solo
                        @input="hideErrorOninputDepartment()"
                        @change="setValueCbOnChange()"
                      ></v-combobox>
                    </div>
                  </div>
                  <div class="m-col-6">
                    <div class="m-row">
                      <div class="m-col-7 m-padding-left-8">
                        <div class="input-wrapper">
                          <p class="text">Số CMND</p>
                          <input
                            type="text"
                            class="t-input"
                            placeholder="Nhập số CMND"
                            fieldname="IdentityNumber"
                            v-model="employee.identityNumber"
                          />
                        </div>
                      </div>
                      <div class="m-col-5 m-padding-left-8">
                        <div class="input-wrapper">
                          <p class="text">Ngày cấp</p>
                          <input
                            type="date"
                            class="t-input"
                            placeholder="DD/MM/YYYY"
                            fieldname="CreatedDate"
                            v-model="employee.createdDate"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="m-row m-margin-top-16">
                  <div class="m-col-6 m-padding-right-8">
                    <div class="input-wrapper">
                      <p class="text">Chức danh</p>
                      <input
                        type="text"
                        class="t-input"
                        placeholder="Nhập chức danh"
                        fieldname="EmployeePosition"
                        v-model="employee.employeePosition"
                      />
                    </div>
                  </div>
                  <div class="m-col-6 m-padding-left-8">
                    <div class="input-wrapper">
                      <p class="text">Nơi cấp</p>
                      <input
                        type="text"
                        class="t-input"
                        placeholder="Nhập nơi cấp"
                        fieldname="IdentityPlace"
                        v-model="employee.identityPlace"
                      />
                    </div>
                  </div>
                </div>
                <div class="m-row m-margin-top-16">
                  <div class="m-col-12">
                    <div class="input-wrapper">
                      <p class="text">Địa chỉ</p>
                      <input
                        type="text"
                        class="t-input"
                        placeholder="Nhập địa chỉ"
                        fieldname="Address"
                        v-model="employee.address"
                      />
                    </div>
                  </div>
                </div>

                <div class="m-row m-margin-top-16">
                  <div class="m-col-3 m-padding-right-8">
                    <div class="input-wrapper">
                      <p class="text">Di động</p>
                      <input
                        type="text"
                        class="t-input"
                        placeholder="Nhập SĐT di động"
                        fieldname="PhoneNumber"
                        v-model="employee.phoneNumber"
                      />
                    </div>
                  </div>
                  <div class="m-col-3 m-padding-right-8">
                    <div class="input-wrapper">
                      <p class="text">Điện thoại cố định</p>
                      <input
                        type="text"
                        class="t-input"
                        placeholder="Nhập SĐT cố định"
                        fieldname="TelephoneNumber"
                        v-model="employee.telephoneNumber"
                      />
                    </div>
                  </div>
                  <div class="m-col-3 m-padding-right-8">
                    <div class="input-wrapper">
                      <p class="text">Email</p>
                      <input
                        type="text"
                        class="t-input"
                        placeholder="Nhập email"
                        fieldname="Email"
                        v-model="employee.email"
                      />
                    </div>
                  </div>
                </div>
                <div class="m-row m-margin-top-16">
                  <div class="m-col-3 m-padding-right-8">
                    <div class="input-wrapper">
                      <p class="text">Tài khoản ngân hàng</p>
                      <input
                        type="text"
                        class="t-input"
                        placeholder="Nhập số tài khoản ngân hàng"
                        fieldname="BankAccountNumber"
                        v-model="employee.bankAccountNumber"
                      />
                    </div>
                  </div>
                  <div class="m-col-3 m-padding-right-8">
                    <div class="input-wrapper">
                      <p class="text">Tên ngân hàng</p>
                      <input
                        type="text"
                        class="t-input"
                        placeholder="Nhập tên ngân hàng"
                        fieldname="BankName"
                        v-model="employee.bankName"
                      />
                    </div>
                  </div>
                  <div class="m-col-3 m-padding-right-8">
                    <div class="input-wrapper">
                      <p class="text">Chi nhánh</p>
                      <input
                        type="text"
                        class="t-input"
                        placeholder="Nhập chi nhánh"
                        fieldname="BankBranchName"
                        v-model="employee.bankBranchName"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="pop-up-footer">
                <button
                  id="btnCancel"
                  @click="btnCancelEmployee"
                  class="t-btn btn-cancel"
                >
                  Không
                </button>
                <div class="pop-up-btns">
                  <button
                    title="Nhấn Ctrl+S"
                    id="saveEmployee"
                    class="t-btn"
                    @click="saveEmployeeOnClick(1)"
                  >
                    Cất
                  </button>
                  <button
                    title="Nhấn Ctrl+Shift+S"
                    id="saveAddEmployee"
                    class="t-btn t-btn-add"
                    @click="saveEmployeeOnClick(2)"
                    @focus="handleOnFocus"
                  >
                    Cất và Thêm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ isHideConfirmCancel: isHideConfirmCancel }">
      <div class="m-dialog">
        <div class="pop-up">
          <div class="pop-up-content">
            <div class="pop-up-icon">
              <div class="icon-question"></div>
            </div>
            <div class="pop-up-text">
              Dữ liệu đã bị thay đổi bạn có muốn cất không?
            </div>
          </div>
          <div class="pop-up-footer">
            <button
              id="btnCancelPopUpDel"
              class="t-btn btn-cancel"
              @click="btnCancelOnClick"
            >
              Hủy
            </button>
            <div class="btn-wrapper-right">
              <button
                id="btnNotConfirm"
                class="t-btn btn-cancel"
                @click="btnNotConFirmOnClick"
              >
                Không
              </button>
              <button
                id="btnDelEmployee"
                class="t-btn t-btn-add"
                @click="btnConFirmOnClick"
              >
                Có
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- toast messenger -->
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
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
  </div>
</template>
<script>
import axios from "axios";
import RootApi from "../../script/base/api.js";
import Enum from "../../script/enum.js";
import Resouces from "../../script/base/resouces.js";
import Gender from "../../script/base/gender";

export default {
  props: {
    isShowDialog: Boolean,
    isEmployeeAdd: Boolean,
    employeeId: String,
    loadData: Function,
    isShowDialogValidate: Boolean,
    setShowDialogValidate: Function,
    stateForm: Number,
  },
  created() {
    let me = this;
    axios
      .get(`${RootApi.department}`)
      .then(function (response) {
        // handle success
        for (const item of response.data) {
          let objItem = {};
          //định nghĩa ừng thuộc tính của object item
          objItem.text = item.departmentName;
          objItem.value = item.departmentId;
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
    /**
     * set value cb onchange
     * Author: NVTAM 29/12/2021
     */
    setValueCbOnChange() {
      //set id phòng ban cho employee
      this.employee.departmentId = this.select.text.value;
    },
    /**
     * Hủy giữ lại form chi tiết
     * Author: NVTAM 29/12/2021
     */

    btnCancelOnClick() {
      this.isHideConfirmCancel = true;
    },
    /**
     * Hủy form thông tin
     * Author: NVTAM 29/12/2021
     */

    btnCancelEmployee: function () {
      //so sách thay đổi giá trị và hiển thị form xác nhận đóng
      let isSome = this.compareChangeEmployee();
      if (isSome) {
        //đóng form nhập liệu
        this.$emit("showDialogAdd", false);
      }
    },
    /**
     * Hủy form thông tin
     * Author: NVTAM 29/12/2021
     */
    btnNotConFirmOnClick() {
      //Ẩn  form xác nhận đóng
      this.isHideConfirmCancel = true;
      this.$emit("showDialogAdd", false);
      //reset tất cả validate trong input
      this.resetValidate();
    },
    /**
     * reset tất cả validate trong input
     * Author: NVTAM 29/12/2021
     */
    resetValidate() {
      this.isFullNameEmpty = false;
      this.isDepartmentEmpty = false;
    },
    /**
     * Tự động focus vào ô mã nhân viên
     * Author: Nguyễn Văn Tâm
     */
    showFocus() {
      this.$refs.isFocus.focus();
    },
    /**
     * Xác nhận cất dữ liệu
     */
    btnConFirmOnClick() {
      this.saveEmployeeOnClick();
      //Ẩn  form xác nhận đóng
      this.isHideConfirmCancel = true;
    },
    /**
     * Format date để render vào input
     * Author: NVTAM (10/1/2022)
     */
    formatDateVModel(value) {
      //format date
      let dateValue = new Date(value);
      let date =
        dateValue.getDate() < 10
          ? `0${dateValue.getDate()}`
          : dateValue.getDate();
      let month =
        dateValue.getMonth() + 1 < 10
          ? `0${dateValue.getMonth() + 1}`
          : dateValue.getMonth() + 1;
      let years = dateValue.getFullYear();
      return `${years}-${month}-${date}`;
    },
    /**
     * Hàm validate dữ liệu phía client
     * CreateBy: NVTAM (31/12/2021)
     */
    validateInputClient() {
      let isValidate = true;
      let error = {};
      //Hiện th form cảnh báo
      if (!this.employee.employeeName) {
        error.text = Resouces.Messenger.WarningName;
        error.isValEmpty = true;
        this.setValidateError(error);
        //Kiểm tra xem có để trống phòng ban không
      } else if (!this.employee.departmentId) {
        error.text = Resouces.Messenger.WarningDepartment;
        error.isValEmpty = true;
        this.setValidateError(error);
        //Kiểm tra ngày sinh có > ngày hiện tại hay không
      } else if (this.employee.dateOfBirth) {
        let me = this;
        let currentDate = new Date();
        let dateOfBirth = new Date(me.employee.dateOfBirth);
        if (currentDate < dateOfBirth) {
          error.text = Resouces.Messenger.WarningDateOfBirth;
          this.setValidateError(error);
          isValidate = false;
        } else {
          isValidate = true;
        }
      } else {
        error.text = "";
        error.isValEmpty = false;
      }
      //Thêm border cảnh báo trường để trống
      if (!this.employee.employeeName) {
        this.isFullNameEmpty = true;
        this.setTitle = "Tên không được để trống";
        isValidate = false;
      } else {
        this.isFullNameEmpty = false;
      }
      if (!this.employee.departmentId) {
        this.isDepartmentEmpty = true;
        isValidate = false;
      } else {
        this.isDepartmentEmpty = false;
      }
      //Trả về kết quả
      return isValidate;
    },
    /**
     * so sánh sự thay đổi của trường nhân viên
     * CreateBy: NVTAM(29/12/2021)
     */
    compareChangeEmployee() {
      for (var key in this.employee) {
        if (this.employee[key] != this.employeeCopy[key]) {
          this.isHideConfirmCancel = false;
          return false;
        }
      }
      // nếu giống nhau thì trả về true
      return true;
    },

    /**
     * Save thông tin nhân viên onclick
     * CreateBy: NVTAM(29/12/2021)
     */
    saveEmployeeOnClick(value) {
      let me = this;
      //validate dữ liệu
      let isValidate = this.validateInputClient();
      //gọi Api thêm mới nhân viên

      if (isValidate) {
        //nếu là chức năng nhân bản thì cho id viên là null
        if (this.stateForm == Enum.FormMode.Replicate) {
          //xóa trường id của nhân viên
          delete this.employee["employeeId"];
        }
        if (
          this.employeeId == null ||
          this.stateForm == Enum.FormMode.Replicate
        ) {
          console.log(this.employee);
          axios
            .post(`${RootApi.employee}`, me.employee)
            .then(function () {
              // Ẩn form nhập thông tin nhân viên
              me.$emit("showDialogAdd", false);
              //load lại trang web
              me.$emit("loadData");
              // reset lại validate
              me.resetValidate();
              //save add nhân viên
              if (value == Enum.FormMode.saveAdd) {
                me.handleGetNewEmployeeCode();
              }
              me.snackbar = true;
              me.textSuccess = Resouces.Messenger.AddSucces;
            })
            .catch(function (error) {
              // me.isSave = false;
              me.setValidateError({
                text: error.response.data.data[0],
              });
            });
        } else {
          axios
            .put(`${RootApi.employee}/${me.employeeId}`, me.employee)
            .then(function () {
              // handle success
              //thoát form
              me.$emit("showDialogAdd", false);
              //load lại dữ liệu
              me.$emit("loadData");
              // reset lại validate
              me.resetValidate();
              //save add nhân viên
              if (value == Enum.FormMode.saveAdd) {
                me.handleGetNewEmployeeCode();
              }
              me.snackbar = true;
              me.textSuccess = Resouces.Messenger.UpdateSuccess;
            })
            .catch(function (error) {
              me.setValidateError({
                text: error.response.data.data[0],
              });
            });
        }
      }
    },
    /**
      Xử lý lấy mã nhân viên mới
      Author: NVTAM (1/1/2022)
     */
    handleGetNewEmployeeCode() {
      let me = this;
      axios
        .get(`${RootApi.employee}/NewEmployeeCode`)
        .then(function (response) {
          // handle success
          me.employee = {};
          //Mặc định giới tính là 1
          me.employee.gender = Gender.GenderValue.Male;
          //Gán mã nhân viên mới
          me.employee.employeeCode = response.data;
          //Focus vào ô mã nhân viên
          me.showFocus();
          //Hiện form thông tin nhân viên
          me.$emit("showDialogAdd", true);
          //copy nhân viên
          me.employeeCopy = { ...me.employee };
        })
        .catch(function () {});
    },

    /**
     * Bắt lỗi validate trên server trả về
     *  Author:NVTam (26/12/2021)
     */

    setValidateError(error) {
      this.validate.value = false;
      this.validate.text = error.text;
      this.validate.isValEmpty = error.isValEmpty;
      //nếu trống Tên hay phòng ban thì hiển thị form trống tên
      this.$emit("setShowDialogValidate", this.validate);
    },
    /**
     * Ẩn error boder khi nhập liệu Tên nhân viên
     * Author:NVTam (26/12/2021)
     */
    hideErrorOninputName() {
      if (this.employee.employeeName) {
        this.isFullNameEmpty = false;
      } else {
        this.isFullNameEmpty = true;
      }
    },
    /**
     * Ẩn error boder khi nhập liệu phòng ban
     * Author:NVTam (26/12/2021)
     */
    hideErrorOninputDepartment() {
      if (this.select.text) {
        this.isDepartmentEmpty = false;
      } else {
        this.isDepartmentEmpty = true;
      }
    },
    /**
     * focus vào ô mã nhân viên
     * Author:NVTam (05/1/2021)
     */
    handleOnFocus() {
      this.$refs.isFocus.focus();
    },
  },
  watch: {
    isShowDialog: function (value) {
      //tự động focus vào input
      this.isFocus = value;
      if (value) {
        if (this.isEmployeeAdd) {
          //Xử lý lấy mã nhân viên mới
          this.handleGetNewEmployeeCode();
        } else if (this.employeeId) {
          let me = this;
          axios
            .get(`${RootApi.employee}/${me.employeeId}`)
            .then(function (response) {
              // handle success
              me.employee = response.data;
              //kiểm tra lại validate dữ liệu
              me.validateInputClient();
              //focus vào ô mã nhân viên
              me.showFocus();
              //format date to render input;
              me.employee.dateOfBirth = me.formatDateVModel(
                response.data.dateOfBirth
              );
              //format ngày tạo
              me.employee.createdDate = me.formatDateVModel(
                response.data.createdDate
              );

              //Lấy department id
              me.select.text = response.data.departmentName;
              me.select.value = response.data.departmentId + "";
              //coppy giá trị empployee
              me.employeeCopy = { ...me.employee };
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });

          //Tính năng Nhân bản
          if (me.stateForm == Enum.FormMode.Replicate) {
            axios
              .get(`${RootApi.employee}/NewEmployeeCode`)
              .then(function (response) {
                //gán mã nhân viên mới
                me.employee.employeeCode = response.data;
              })
              .catch(function () {});
          }
        }
      } else {
        this.employee = {};
        this.select = {
          text: Resouces.Messenger.ValEmpty,
          value: Resouces.Messenger.ValEmpty,
        };
      }
    },
  },
  data() {
    return {
      setTitle: "",
      employee: {},
      employeeCopy: {},
      validate: {
        value: false,
        text: "",
        statusCode: null,
      },
      isFullNameEmpty: false,
      isDepartmentEmpty: false,
      isHideConfirmCancel: true,
      // save: false,
      //combobox
      select: {},
      items: [],
      //data toast messenger
      snackbar: false,
      textSuccess: "",
      //set time out cho toast mesenger
      timeout: 2000,
    };
  },
};
</script>
