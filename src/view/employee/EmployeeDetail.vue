<template>
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
                <i class="far fa-question-circle"></i>
              </button>
              <button
                id="btnEscape"
                @click="btnCancelEmployee"
                class="btn-top-left btn-escape"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="pop-up-header">
              <p class="pop-up-title">Thông tin nhân viên</p>
              <div class="pop-up-checks">
                <div class="pop-up-check"></div>
                <p>Là khách hàng</p>
                <div class="pop-up-check"></div>
                <p>Là nhà cung cấp</p>
              </div>
            </div>
            <div class="pop-up-content m-with-auto">
              <div class="m-row">
                <div class="m-col-6">
                  <div class="m-row">
                    <div class="m-col-5 m-padding-right-8">
                      <div class="input-wrapper">
                        <p class="text">Mã *</p>
                        <input
                          type="text"
                          class="t-input"
                          ref="isFocus"
                          placeholder="Nhập mã nhân viên"
                          fieldname="EmployeeCode"
                          v-model="employee.EmployeeCode"
                          id="employeeCode"
                        />
                      </div>
                    </div>
                    <div class="m-col-7 m-padding-right-8">
                      <div class="input-wrapper">
                        <p class="text">Tên *</p>
                        <input
                          type="text"
                          class="t-input"
                          placeholder="Nhập tên nhân viên"
                          fieldname="EmployeeName"
                          validate="FullName"
                          v-model="employee.EmployeeName"
                          id="FullName"
                        />
                        <div class="error-message">Tên không được để trống</div>
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
                          fieldname="DateOfBirth"
                          v-model="employee.DateOfBirth"
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
                              checked=""
                              v-model="employee.Gender"
                            />
                            Nam
                          </label>
                          <label for="female">
                            <input
                              type="radio"
                              name="Gender"
                              value="0"
                              id="female"
                              v-model="employee.Gender"
                            />
                            Nữ</label
                          >
                          <label for="other">
                            <input
                              type="radio"
                              name="Gender"
                              value="2"
                              id="other"
                              v-model="employee.Gender"
                            />
                            Khác
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
                    <p class="text">Đơn vị</p>
                    <base-combobox
                      @setValueInCombobox="setValueInCombobox"
                      :department="department"
                      :isShowDialog="isShowDialog"
                    />
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
                          fieldname="PersonalTaxCode"
                          v-model="employee.PersonalTaxCode"
                        />
                      </div>
                    </div>
                    <div class="m-col-5 m-padding-left-8">
                      <div class="input-wrapper">
                        <p class="text">Ngày cấp</p>
                        <input
                          type="date"
                          class="t-input"
                          placeholder="Nhập ngày cấp"
                          fieldname="CreatedDate"
                          v-model="employee.CreatedDate"
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
                      v-model="employee.EmployeePosition"
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
                      v-model="employee.IdentityPlace"
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
                      v-model="employee.Address"
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
                      v-model="employee.PhoneNumber"
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
                      v-model="employee.TelephoneNumber"
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
                      v-model="employee.Email"
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
                      v-model="employee.BankAccountNumber"
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
                      v-model="employee.BankName"
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
                      v-model="employee.BankBranchName"
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
                  id="saveEmployee"
                  class="t-btn"
                  @click="saveEmployeeOnClick"
                >
                  Cất
                </button>
                <button
                  id="saveAddEmployee"
                  class="t-btn t-btn-add"
                  @click="saveAddEmployeeOnClick"
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
</template>
<script>
import axios from "axios";
import BaseCombobox from "../../components/base/BaseCombobox.vue";
export default {
  components: {
    BaseCombobox,
  },
  props: {
    isShowDialog: Boolean,
    isEmployeeAdd: Boolean,
    employeeId: String,
    loadData: Function,
    isShowDialogValidate: Boolean,
    setShowDialogValidate: Function,
  },
  methods: {
    btnCancelEmployee: function () {
      this.$emit("showDialogAdd", false);
    },
    showFocus() {
      this.$refs.isFocus.focus();
    },
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
    saveEmployeeOnClick() {
      let me = this;
      //gọi Api thêm mới nhân viên
      if (this.employeeId == null) {
        axios
          .post("http://amis.manhnv.net/api/v1/Employees", me.employee)
          .then(function (response) {
            // handle success
            me.btnCancelEmployee();
            //load lại trang web
            me.$emit("loadData");
            console.log(response);
          })
          .catch(function (error) {
            // handle error

            me.validate.value = false;
            me.validate.text = error.response.data.userMsg;
            me.$emit("setShowDialogValidate", me.validate);
          });
      } else {
        axios
          .put(
            `http://amis.manhnv.net/api/v1/Employees/${me.employeeId}`,
            me.employee
          )
          .then(function (response) {
            // handle success
            //thoát form
            me.btnCancelEmployee();
            //load lại dữ liệu
            me.$emit("loadData");
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            me.validate.value = false;
            me.validate.text = error.response.data.userMsg;
            me.$emit("setShowDialogValidate", me.validate);
          });
      }
    },
    saveAddEmployeeOnClick() {
      //Lưu thông tin nhân viên
      this.saveEmployeeOnClick();
      //Lấy mã nhân viên mới
      let me = this;
      axios
        .get("http://amis.manhnv.net/api/v1/Employees/NewEmployeeCode")
        .then(function (response) {
          // handle success
          me.employee = {};
          me.employee.EmployeeCode = response.data;
          //Focus vào ô mã nhân viên
          me.showFocus();
          //Hiện form thông tin nhân viên
          me.$emit("showDialogAdd", true);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    /**
     * set value cho combobox
     * Author:NVTam (26/12/2021)
     */
    setValueInCombobox(item) {
      if (item) {
        this.department = item;
        //gán thông tin id của  department được chọn vào employee
        this.employee.DepartmentId = this.department.value;
      }
    },
  },
  watch: {
    isShowDialog: function (value) {
      //tự động focus vào input
      this.isFocus = value;
      if (value) {
        if (this.isEmployeeAdd) {
          let me = this;
          axios
            .get("http://amis.manhnv.net/api/v1/Employees/NewEmployeeCode")
            .then(function (response) {
              // handle success
              me.employee = {};
              me.employee.EmployeeCode = response.data;
              //Focus vào ô mã nhân viên
              me.showFocus();
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
        } else if (this.employeeId) {
          let me = this;

          axios
            .get(`http://amis.manhnv.net/api/v1/Employees/${me.employeeId}`)
            .then(function (response) {
              // handle success
              me.employee = response.data;
              //format date to render input;
              me.employee.DateOfBirth = me.formatDateVModel(
                response.data.DateOfBirth
              );
              //Lấy department id
              me.department.text = response.data.DepartmentName;
              me.department.value = response.data.DepartmentId + "";
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
        }
      } else {
        this.employee = {};
      }
    },
  },
  data() {
    return {
      employee: {},
      department: {},
      validate: {
        value: false,
        text: "",
      },
    };
  },
};
</script>
