const taskInput = document.querySelector('.task-input');
const taskAdd = document.querySelector('.task-add');
const todo = document.querySelector('.todo');

if (localStorage.length > 0) {
  for (let i = 0; i < localStorage.length; i++) {

    const bd = JSON.parse(localStorage.getItem(localStorage.key(i)));
    fillToDo(bd)
  }
}

taskAdd.addEventListener('click', function () {
  const bd = {
    id: new Date().getTime(),
    task: taskInput.value,
    check: 'on',
  };

  fillToDo(bd)

  taskInput.value = '';
  taskInput.focus();

  localStorage.setItem(bd.id, JSON.stringify(bd));

})

window.addEventListener('click', function (e) {

  if (e.target.matches('.todo__item-task')) { changeTask(e.target) }

  if (e.target.matches('.btn-edit')) {
    const todoItem = e.target.closest('.todo__item');
    changeTask(todoItem.querySelector('.todo__item-task'));
  }

  if (e.target.matches('.btn-comlete')) {
    const todoItem = e.target.closest('.todo__item');
    doneTask(todoItem);
  }

  if (e.target.matches('.btn-delete')) {
    const todoItem = e.target.closest('.todo__item');
    deleteTask(todoItem);
  }
})

function changeTask(item) {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = item.textContent;
  item.textContent = '';
  item.appendChild(input);
  input.focus();

  input.addEventListener('blur', function () {
    item.textContent = input.value;
    input.remove();
    const bd = JSON.parse(localStorage.getItem(item.closest('.todo__item').dataset.id));
    bd.task = input.value;
    localStorage.setItem(item.closest('.todo__item').dataset.id, JSON.stringify(bd));
  })
}

function doneTask(item) {
  const btnComlete = item.querySelector('.btn-comlete');

  if (btnComlete.dataset.check === 'on') {
    btnComlete.dataset.check = 'off';
    item.classList.add('grey');
    btnComlete.value = "Не выполнил";
  } else {
    btnComlete.dataset.check = 'on';
    item.classList.remove('grey');
    btnComlete.value = "Выполнил";
  }

  const bd = JSON.parse(localStorage.getItem(item.dataset.id));
  bd.check = btnComlete.dataset.check;
  localStorage.setItem(item.dataset.id, JSON.stringify(bd));
}

function deleteTask(item) {
  localStorage.removeItem(item.dataset.id);
  item.remove();
}

function fillToDo(bd) {
  const newTask = `
  <div class="todo__item" data-id="${bd.id}">
    <div class="todo__item-task">${bd.task}</div>
    <div class="todo__item-nav">
      <input type="button" value="Изменить" class="btn-edit">
      <input type="button" value="Выполнил" data-check="${bd.check}" class="btn-comlete">
      <input type="button" value="Удалить" class="btn-delete">
    </div>
  </div>`;
  todo.insertAdjacentHTML('beforeend', newTask);
}