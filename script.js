// Get elements from the DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const editTaskInput = document.getElementById('editTaskInput');
const updateBtn = document.getElementById('updateBtn');

let selectedTask = null;

// Add click event listener to the "Add" button
addTaskBtn.addEventListener('click', addTask);

// Add task to the UI when the "Add" button is clicked
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        const taskTextElement = document.createElement('span');
        taskTextElement.classList.add('task-text');
        taskTextElement.textContent = taskText;

        const updateStatusButton = document.createElement('button');
        updateStatusButton.classList.add('update-status-btn');
        updateStatusButton.textContent = 'Update Status';

        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        editButton.textContent = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete Todo';

        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(updateStatusButton);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
}

// Update the status of the task
function updateStatus(event) {
    const taskItem = event.target.closest('.task-item');
    taskItem.classList.toggle('completed');
}

// Open the edit modal and populate the input field with the existing task text
function openEditModal(event) {
    const taskItem = event.target.closest('.task-item');
    const taskTextElement = taskItem.querySelector('.task-text');
    selectedTask = taskItem;
    editTaskInput.value = taskTextElement.textContent;
    editModal.style.display = 'block';
}

// Update the task text and close the edit modal
function updateTask(event) {
    event.preventDefault();
    const updatedTaskText = editTaskInput.value.trim();
    if (updatedTaskText !== '') {
        const taskTextElement = selectedTask.querySelector('.task-text');
        taskTextElement.textContent = updatedTaskText;
        closeEditModal();
    }
}

// Close the edit modal
function closeEditModal() {
    editModal.style.display = 'none';
    selectedTask = null;
    editTaskInput.value = '';
}

// Delete the task from the UI
function deleteTask(event) {
    const taskItem = event.target.closest('.task-item');
    taskItem.remove();
}

// Add event listeners for updating the status, editing a task, and deleting a task
taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('update-status-btn')) {
        updateStatus(event);
    }

    if (event.target.classList.contains('edit-btn')) {
        openEditModal(event);
    }

    if (event.target.classList.contains('delete-btn')) {
        deleteTask(event);
    }
});

// Add event listener for submitting the edit form
editForm.addEventListener('submit', updateTask);

// Add event listener for closing the edit modal
window.addEventListener('click', function(event) {
    if (event.target === editModal) {
        closeEditModal();
    }
});
