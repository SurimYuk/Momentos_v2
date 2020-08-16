"use strict";

const setting = document.querySelector(".js-setting"),
  settingBtn = document.querySelector(".js-settingBtn"),
  logoutBtn = document.querySelector(".logoutBtn");

const SHOWSETTING_CN = "showSetting";

function handleClickSettingBtn() {
  event.preventDefault();
  setting.classList.toggle(SHOWSETTING_CN);
}

function handleClickLogoutBtn() {
  event.preventDefault();
  localStorage.removeItem("userName");
  setting.classList.toggle(SHOWSETTING_CN);
  location.reload();
}

function init() {
  settingBtn.addEventListener("click", handleClickSettingBtn);
  logoutBtn.addEventListener("click", handleClickLogoutBtn);
}

init();
