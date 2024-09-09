let tasks = []; 

function addTask(event) {
    event.preventDefault();
    const taskTitle = document.getElementById("taskTitle").value;
    const taskDesc = document.getElementById("taskDesc").value;
    const taskDueDate = document.getElementById("taskDueDate").value;

    if (!taskTitle || !taskDueDate) {
        displayFeedback("Please fill in all required fields", "error");
        return;
    }

    const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDesc,
        dueDate: taskDueDate,
        completed: false
    };

    tasks.push(newTask);
    displayTasks(); 
    document.getElementById("taskForm").reset();
    displayFeedback("Task added successfully");
}

function displayTasks(filter = 'all') {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks;
    if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.classList.add(task.completed ? 'completed' : '');

        taskItem.innerHTML = `
            <div>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                <strong>${task.title}</strong><br>
                <small>${task.description}</small><br>
                <small>Due: ${task.dueDate}</small>
            </div>
            <div>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskItem);
    });
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDesc").value = task.description;
    document.getElementById("taskDueDate").value = task.dueDate;

    deleteTask(taskId); // Remove the task after editing to avoid duplication
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    displayTasks();
    displayFeedback("Task deleted successfully");
}

function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    displayTasks();
    displayFeedback("Task status updated");
}

function filterTasks(event, filter) {
    event.preventDefault(); // Prevent default link behavior
    displayTasks(filter);
}

function displayFeedback(message, type = "success") {
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.textContent = message;
    feedbackElement.className = `feedback ${type}`;
    
    setTimeout(() => {
        feedbackElement.textContent = '';
    }, 3000); // Clear feedback after 3 seconds
}
