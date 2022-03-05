<template>
  <div :class="{ isHidePopup: isHidePopup }">
    <div class="m-dialog">
      <div class="pop-up">
        <div class="pop-up-content">
          <div class="pop-up-icon">
            <div class="icon-question"></div>
          </div>
          <div class="pop-up-text">
            <!-- gán text -->
            {{ textMsg }}
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
</template>
