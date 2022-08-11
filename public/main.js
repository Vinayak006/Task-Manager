let updateId;
const displayArea = document.querySelector("article");
const inputDOM = document.querySelector("#task");

async function displayTasks() {
  // const data = await axios({
  //   method: 'get',
  //   url: '/tasks'
  // })
  // console.log(data)
  try {
    const resObj = await axios({
      method: "get",
      url: "/tasks",
    });
    if (resObj.data.success === "false") {
      displayArea.innerHTML =
        "<div id=tasks><h3 style='letter-spacing: 1px'>List is empty. Try adding new...</h3><div>";
      return;
    }
    const allTasks = resObj.data.task
      .map((task) => {
        const { _id: taskId, name, completed } = task;
        return `<div id="tasks">
        <div id="htwo" data-id="${taskId}" class="${
          completed && "finished"
        }">${name} </div>
    <div id="btns"> <h6 data-id="${taskId}" style="color: green">done</h6> <h6 style="color: blue">edit</h6> <h6 style="color: red">delete</h6> </div> </div>`;
      })
      .join("");
    displayArea.innerHTML = allTasks;
  } catch (error) {
    console.log(error);
    displayArea.innerHTML = `<div id=tasks><h3>Sorry, there was an Error. please try later..</h3></div>`;
  }
}

displayTasks();

async function addTask() {
  const name = document.querySelector("#task").value;
  if (!name) {
    return;
  }
  try {
    await axios({
      method: "post",
      url: "/tasks",
      data: { name },
    });
    inputDOM.value = "";
    inputDOM.focus();
    displayTasks();
  } catch (error) {
    displayArea.innerHTML = `<div id=tasks><h3>Sorry, there was an Error. please try later..</h3></div>`;
  }
}

async function updateTask() {
  const name = document.querySelector("#task").value;
  if (!name) {
    return;
  }
  try {
    displayArea.innerHTML = `<div id="tasks" style="letter-spacing: 1px"><h3>Updating...</h3></div>`;

    await axios({
      method: "put",
      url: `/tasks/${updateId}`,
      data: {
        name: name,
      },
    });
    displayTasks();
    inputDOM.value = "";
    document.querySelector(".abtn").style.display = "block";
    document.querySelector(".ubtn").style.display = "none";
  } catch (error) {
    displayArea.innerHTML = `<div id=tasks><h3>Sorry, there was an Error. please try later..</h3></div>`;
  }
}

displayArea.addEventListener("click", async (e) => {
  const taskId =
    e.target.parentNode.parentNode.firstElementChild.getAttribute("data-id");
  if (taskId === null) {
    return;
  }
  const process = e.target.innerText;
  if (process === "done") {
    const n = e.target.parentNode.parentNode.firstElementChild.className;
    let data = n === "finished" ? false : true;
    try {
      displayArea.innerHTML = `<div id="tasks" style="letter-spacing: 1px"><h3>Updating...</h3></div>`;
      await axios({
        method: "put",
        url: `/tasks/${taskId}`,
        data: {
          completed: data,
        },
      });
      displayTasks();
    } catch (error) {
      displayArea.innerHTML = `<div id="tasks"><h3>Sorry, there was an Error. please try later..</h3></div>`;
    }
  }
  if (process === "delete") {
    try {
      displayArea.innerHTML = `<div id="tasks" style="letter-spacing: 1px"><h3>Deleting...</h3></div>`;
      await axios({
        method: "delete",
        url: `/tasks/${taskId}`,
      });
      displayTasks();
    } catch (error) {
      displayArea.innerHTML = `<div id="tasks"><h3>Sorry, there was an Error. please try later..</h3></div>`;
    }
  }
  if (process === "edit") {
    updateId = taskId;
    inputDOM.value = e.target.parentNode.parentNode.firstElementChild.innerText;
    inputDOM.focus();
    document.querySelector(".abtn").style.display = "none";
    document.querySelector(".ubtn").style.display = "block";
  }
});
