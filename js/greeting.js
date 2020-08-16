"use strict";

const NAME_LS = "userName";
const SHOWING_CN = "showing";

const greetingForm = document.querySelector(".js-greetingForm"),
  greetingInput = greetingForm.querySelector("input"),
  greeting = document.querySelector(".js-greeting"),
  toDo = document.querySelector(".js-toDo");

function paintGreeting(name) {
  greetingForm.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  toDo.classList.add(SHOWING_CN);

  const currentHour = new Date().getHours();
  let greetingComment = "";
  if (5 <= currentHour && currentHour < 12) greetingComment = "Good morning, ";
  else if (12 <= currentHour && currentHour < 20)
    greetingComment = "Good afternoon, ";
  else greetingComment = "Good evening, ";
  greetingComment += `${name}.`;
  greeting.innerText = greetingComment;
}

function saveName(name) {
  localStorage.setItem(NAME_LS, name);
}

function handleSubmit() {
  event.preventDefault();
  const inputValue = greetingInput.value;
  paintGreeting(inputValue);
  saveName(inputValue);
}

function askForName() {
  greetingForm.classList.add(SHOWING_CN);
  greetingForm.addEventListener("submit", handleSubmit);
}

function loadName() {
  const name = localStorage.getItem(NAME_LS);
  if (name !== null) {
    paintGreeting(name);
  } else {
    askForName();
  }
}

function init() {
  loadName();
}

init();
