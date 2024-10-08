document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.querySelector('#taskInput');  // Input for tasks
    const taskForm = document.querySelector('#taskForm');    // Form element
    const taskList = document.querySelector('#taskList');    // Task list container
    const error = document.querySelector('#error');          // Error message element

    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => createTaskElement(task.text, task.completed));

    // Event listener for form submission
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskText = taskInput.value.trim();

        // Tarkista, onko syöte tyhjää tai liian lyhyt
        if (taskText.length === 0) {
            alert('Syöte ei voi olla tyhjä. Anna vähintään 4 merkkiä.');
            return; // Lopeta toiminto
        } else if (taskText.length <= 3) {
            alert('Syötteen on oltava yli 3 merkkiä pitkä.');
            return; // Lopeta toiminto
        }

        // Jos syöte on riittävän pitkä, luo uusi tehtävä
        createTaskElement(taskText);
        saveTask(taskText);
        taskInput.value = '';  // Clear input field
        error.classList.add('hidden');  // Hide error
    });

    // Function to validate task input (minimum length of 3)
    function validateInput(input) {
        return input.length > 3; // Muutettu niin, että hyväksyy vain yli 3 merkkiä
    }

    // Show error message
    function showError() {
        error.classList.remove('hidden');
        taskInput.classList.add('error');
    }

    // Create a new task element in the task list
    function createTaskElement(text, completed = false) {
        const li = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = text;

        // Apply 'completed' class to span and 'checked' class to li if task is completed
        if (completed) {
            taskSpan.classList.add('completed');  // Apply to span
            li.classList.add('checked');           // Apply to li for icon
        }

        // Create Complete button
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            taskSpan.classList.toggle('completed');  // Toggle 'completed' class on the task text only
            li.classList.toggle('checked');           // Toggle 'checked' class on the li for the icon
            toggleTaskCompletion(text);  // Update completion status in localStorage
        });

        // Create Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.remove();  // Remove task element from the list
            removeTask(text);  // Remove task from localStorage
        });

        li.appendChild(taskSpan);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    // Save a new task in localStorage
    function saveTask(text) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Remove a task from localStorage
    function removeTask(text) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.text !== text);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Toggle task completion status and update localStorage
    function toggleTaskCompletion(text) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = tasks.find(task => task.text === text);

        if (task) {
            task.completed = !task.completed;  // Toggle completion status
            localStorage.setItem('tasks', JSON.stringify(tasks));  // Save updates
        }
    }
});
