const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

// New projects list (lists container)
const projectsList = document.querySelector('#projects-list');
// Add/delete/clear tasks project - functionality
const addProjectBtn = document.querySelector('#button-add-project');
const deleteProjectBtn = document.querySelector('#button-delete-project');
const clearCompletedTasksBtn = document.querySelector('#button-clear-completed-tasks');
// Add project - popup
const addProjectPopupBtn = document.querySelector('#add-project-popup');
const addPopupBtn = document.querySelector('#button-add-project-popup');
const cancelPopupBtn = document.querySelector('#button-cancel-project-popup');
// Form & Input inside popup 
const AddProjectForm = document.querySelector('#form-add-project');
const addProjectPopupInput = document.querySelector('#input-add-project-popup');
// Add tasks - section
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.querySelector('#task-template');
const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');

const openPopup = () => {
    // Open pop-up view
    addProjectBtn.classList.add('active');
    deleteProjectBtn.classList.add('active');
    addProjectPopupBtn.classList.add('active');
    addPopupBtn.classList.add('active');
    cancelPopupBtn.classList.add('active');
    clearCompletedTasksBtn.classList.add('active');
}

const closePopup = () => {
    // Close pop-up view
    addProjectBtn.classList.remove('active');
    deleteProjectBtn.classList.remove('active');
    addProjectPopupBtn.classList.remove('active');
    addPopupBtn.classList.remove('active');
    cancelPopupBtn.classList.remove('active');
    clearCompletedTasksBtn.classList.remove('active');
}

addProjectBtn.addEventListener('click', () => {
    // Close/Open pop-up view
    openPopup();
    cancelPopupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closePopup();
    })
})

const clearElement = (element) => {
    // Clear out all the elements that already exist in Projects List
    // Result is; all those existing elements are removed, only adds a new ones
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

const save = () => {
    // Save function is responsible for saving items&currently choosed elements to localStorage 
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId); // actually clicked element
}

const renderTaskCount = (selectedList) => {
    // Display amount of remaining tasks
    const incompleteTasksCount = selectedList.tasks.filter(task => !task.complete).length;
    const taskString = incompleteTasksCount === 1 ? "task" : "tasks";
    listCountElement.innerText = `${incompleteTasksCount} ${taskString} remaining`;
}

const renderTasks = (selectedList) => {
    selectedList.tasks.forEach(task => {
        // Rendering(adding) new tasks using template pattern made in html
        const taskElement = document.importNode(taskTemplate.content, true); // true to render everything inside template(not just top of it)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id // checkbox got same id as task element
        checkbox.checked = task.complete // if task is checked = it's marked as complete
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.title)
        tasksContainer.appendChild(taskElement)
    })
}

const renderLists = () => {
    // Rendering(adding) new Project Lists on the page
    lists.forEach((list) => {
        const newTitle = document.createElement('li');
        newTitle.dataset.listId = list.id;
        newTitle.classList.add('title-name');
        newTitle.innerText = list.title;
        // #1 list.id === selectedListId
        if (list.id === selectedListId) {
            newTitle.classList.add('active-list');
        }
        projectsList.appendChild(newTitle);
    })
}

const render = () => {
    clearElement(projectsList)
    renderLists()

    const selectedList = lists.find(list => list.id === selectedListId)
    if (selectedListId === null) {
        // If Projects List is not selected - hide add task section
        listDisplayContainer.style.display = 'none';
    } else {
        listDisplayContainer.style.display = '';
        listTitleElement.innerText = selectedList.title;
        renderTaskCount(selectedList)
        clearElement(tasksContainer)
        renderTasks(selectedList)
    }
}

const saveAndRender = () => {
    save();
    render();
}

const createTitle = (title) => {
    return {
        id: Date.now().toString(),
        title: title,
        tasks: []
    }
}

const createTask = (title) => {
    return {
        id: Date.now().toString(),
        title: title,
        complete: false
    }
}

AddProjectForm.addEventListener('submit', (e) => {
    // Creating new List Project based on submit input values
    e.preventDefault();
    const inputText = addProjectPopupInput.value;
    if (inputText === null || inputText === '') return
    const list = createTitle(inputText);
    addProjectPopupInput.value = null;
    lists.push(list);
    saveAndRender();
})

newTaskForm.addEventListener('submit', e => {
    e.preventDefault();
    const taskName = newTaskInput.value;
    if (taskName === null || taskName === '') return
    const task = createTask(taskName);
    newTaskInput.value = null;
    const selectedList = lists.find(list => list.id === selectedListId); // list that is currently selected
    selectedList.tasks.push(task); // add a new task to currently selected list
    saveAndRender();
})

projectsList.addEventListener('click', e => {
    // Extension to renderLists function, making clicked element on Projects List active
    if (e.target.tagName.toLowerCase() === 'li') {
        // #2 list.id === selectedListId
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
})

tasksContainer.addEventListener('click', e => {
    // Making selected(clicked) tasks active/inactive
    if (e.target.tagName.toLowerCase() === 'input') { // check if clicked on Checkbox
        const selectedList = lists.find(list => list.id === selectedListId);
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id); // comparate task.id to Checkbox id(e.target.id)
        selectedTask.complete = e.target.checked;
        save();
        renderTaskCount(selectedList);
    }
})

deleteProjectBtn.addEventListener('click', () => {
    lists = lists.filter(list => list.id !== selectedListId);
    selectedListId = null;
    saveAndRender();
})

clearCompletedTasksBtn.addEventListener('click', () => {
    const selectedList = lists.find(list => list.id === selectedListId); // choose actually selected list
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete); // overwrite tasks, so basically keep tasks that are not completed
    saveAndRender();
})

render();