"use strict";

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input");

const PENDING_LS = "pending",
  FINISHED_LS = "finished";

let pendingList = [],
  finishedList = [];

function makeObj(text) {
  return {
    id: String(Date.now()),
    text,
  };
}

function removeFromPendingList(listId) {
  pendingList = pendingList.filter(function (list) {
    return list.id !== listId;
  });
}

function removeFromFinishedList(listId) {
  finishedList = finishedList.filter(function (list) {
    return list.id !== listId;
  });
}

function findFromPendingList(listId) {
  return pendingList.find(function (list) {
    return list.id === listId;
  });
}

function findFromFinishedList(listId) {
  return finishedList.find(function (list) {
    return list.id === listId;
  });
}

function handleClickDelete() {
  event.preventDefault();
  const li = event.target.parentNode;
  removeFromPendingList(li.id);
  removeFromFinishedList(li.id);
  li.parentNode.removeChild(li);
  saveState();
}

function makeGeneralLi(inputObj) {
  const li = document.createElement("li");
  const content = document.createElement("span");
  const delBtn = document.createElement("button");

  li.id = inputObj.id;
  content.innerText = inputObj.text;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", handleClickDelete);

  li.appendChild(content);
  li.appendChild(delBtn);

  return li;
}

function handleClickFinished() {
  event.preventDefault();
  const li = event.target.parentNode;
  const targetedObj = findFromPendingList(li.id);

  removeFromPendingList(li.id);
  li.parentNode.removeChild(li);

  addToFinished(targetedObj);
}

function paintPending(inputObj) {
  const li = makeGeneralLi(inputObj);
  const finishedBtn = document.createElement("button");

  finishedBtn.innerText = "✔️";
  finishedBtn.addEventListener("click", handleClickFinished);
  li.appendChild(finishedBtn);

  const pendingUl = document.querySelector(".js-pendingList");
  pendingUl.appendChild(li);
}

function handleClickReturn() {
  event.preventDefault();
  const li = event.target.parentNode;
  const targetedObj = findFromFinishedList(li.id);

  removeFromFinishedList(li.id);
  li.parentNode.removeChild(li);

  addToPending(targetedObj);
}

function paintFinished(inputObj) {
  const li = makeGeneralLi(inputObj);
  const returnBtn = document.createElement("button");

  returnBtn.innerText = "️️️️↩️";
  returnBtn.addEventListener("click", handleClickReturn);
  li.appendChild(returnBtn);

  const finishedUl = document.querySelector(".js-finishedList");
  finishedUl.appendChild(li);
}

function saveState() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendingList));
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedList));
}

function addToFinished(inputObj) {
  finishedList.push(inputObj);
  paintFinished(inputObj);
  saveState();
}

function addToPending(inputObj) {
  pendingList.push(inputObj);
  paintPending(inputObj);
  saveState();
}

function handleSubmit() {
  event.preventDefault();
  addToPending(makeObj(toDoInput.value));
  toDoInput.value = "";
}

function loadToDo() {
  pendingList = JSON.parse(localStorage.getItem(PENDING_LS)) || [];
  finishedList = JSON.parse(localStorage.getItem(FINISHED_LS)) || [];
}

function restoreToDo() {
  pendingList.forEach(function (list) {
    paintPending(list);
  });
  finishedList.forEach(function (list) {
    paintFinished(list);
  });
}

function init() {
  toDoForm.addEventListener("submit", handleSubmit);
  loadToDo();
  restoreToDo();
}

init();
