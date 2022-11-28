"use strict";
let input = document.querySelector(".input-add"),
  addButton = document.querySelector(".button-add"),
  outBox = document.querySelector(".out-box"),
  comment = document.querySelector(".input-comment"),
  deadline = document.querySelector(".input-date"),
  tasks = [];

function enterText(e) {
  e.preventDefault();
  if (!input.value) {
    alert("Please write something!");
  } else {
    let checkTask = tasks.some((task) => task === input.value.toLowerCase());
    if (checkTask) {
      return alert("bu oldin kiritilgan");
    } else {
      tasks.push(input.value.toLowerCase());
      input.value = "";
    }
    let taskBox;
    tasks.map((task, index) => {
      taskBox = document.createElement("div"); //div for task
      taskBox.classList.add("task-box");

      //task name
      let taskName = document.createElement("input");
      taskName.type = "text";
      taskName.readOnly = "readonly";
      taskName.autofocus = "autofocus";
      taskName.classList.add("task-name");

      //deadline
      let taskDeadline = document.createElement("span");
      taskDeadline.classList.add("task-deadline");

      // edit button
      let editButton = document.createElement("i");
      editButton.classList.add("fa-regular", "fa-pen-to-square");
      editButton.value = "edit";
      function edit(e) {
        e.preventDefault();
        if (editButton.value === "edit") {
          taskName.removeAttribute("readonly");
          taskName.focus();
          editButton.value = "save";
        } else {
          editButton.classList.add("fa-regular", "fa-floppy-disk");
          taskName.setAttribute("readonly", "readonly");
          editButton.value = "edit";
        }
      }
      editButton.addEventListener("click", edit);

      // Deadline
      taskDeadline.textContent = `Deadline: ${deadline.value}`;

      // delete task
      let deleteButton = document.createElement("i");
      deleteButton.classList.add("fa-regular", "fa-trash-can");
      function deleteTask(e) {
        e.preventDefault();
        outBox.removeChild(taskBox);
      }
      deleteButton.addEventListener("click", deleteTask);

      //comment for task
      let commentButton = document.createElement("i");
      commentButton.classList.add("fa-regular", "fa-comment");
      commentButton.title = comment.value;

      //conteiner for buttons
      let buttons = document.createElement("div");
      buttons.classList.add("buttons-box");

      // displaying task name
      taskName.value = task;

      taskBox.appendChild(taskName);
      buttons.appendChild(deleteButton);
      buttons.appendChild(commentButton);
      buttons.appendChild(editButton);
      taskBox.appendChild(buttons);
      taskBox.appendChild(taskDeadline);
    });
    deadline.value = "";
    comment.value = "";
    outBox.appendChild(taskBox);
  }
}
addButton.addEventListener("click", enterText);
