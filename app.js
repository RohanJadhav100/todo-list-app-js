let task = [];

let deletedTask = (taskId) => {
  let position = task.findIndex((e) => {
    return e.id == taskId;
  });
  task.splice(position, 1);
  updateStorage();
  addTask();
};

let updateTotalTask = () => {
  $(".totalTask-text").text(`Total Task : ${task.length}`);
};

let completedTask = () => {
  let total = 0;
  task.forEach((e) => {
    if (e.completed) {
      total = total + 1;
    }
  });
  $(".complete-text").text(`Completed : ${total}`);
};

let toggleTask = (taskId) => {
  let position = task.findIndex((e) => {
    return e.id == taskId;
  });
  if (task[position].completed) {
    task[position].completed = false;
  } else {
    task[position].completed = true;
  }
  updateStorage();
  addTask();
};

let addTask = () => {
  completedTask();
  updateTotalTask();
  $(".list-box").html("");
  task.forEach((singleTask) => {
    let d = document.createElement("div");
    d.id = singleTask.id;
    d.innerHTML = `
        <div class="task-text">${singleTask.title}</div>
        <div class="icons">
            <button class="tick-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </button>
            <button class="delete-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
        </div>
        `;
    d.classList.add("single-task");
    d.querySelector(".delete-icon").addEventListener("click", (e) => {
      deletedTask(e.target.closest("div").parentElement.id);
      // console.log(e.target.closest("div").parentElement.id);
    });
    d.querySelector(".tick-icon").addEventListener("click", (e) => {
      toggleTask(e.target.closest("div").parentElement.id);
    });
    if (singleTask.completed) {
      d.querySelector("div").classList.toggle("lineThrough");
    }
    document.querySelector(".list-box").appendChild(d);
  });
};
let allDeleteTask = () => {
  task = [];
  updateStorage();
  addTask();
};
let createNewTask = (ivalue) => {
  task.push({
    id: Math.floor(Math.random() * 1000000 + 1),
    title: ivalue,
    completed: false,
  });
  updateStorage();
  addTask();
};
let updateStorage = () => {
  localStorage.setItem("task", JSON.stringify(task));
};

$(document).ready(function () {
  let r = localStorage.getItem("task");
  if (r != null) {
    task = JSON.parse(r);
  }
  addTask();
  $("#task-form").submit(function (e) {
    e.preventDefault();
    let iValue = document.getElementById("input").value.trim();
    if (iValue == "") {
      alert("All field Neccessary");
    } else {
      createNewTask(iValue);
      e.target.reset();
    }
  });
  $(".allDeleteBtn").click(function () {
    allDeleteTask();
  });
});
