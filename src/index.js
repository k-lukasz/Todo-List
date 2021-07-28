const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

// New projects list
const projectsList = document.querySelector('#projects-list');
// Add/delete project - functionality
const addProjectBtn = document.querySelector('#button-add-project');
const deleteProjectBtn = document.querySelector('#button-delete-project');
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
}

const closePopup = () => {
    // Close pop-up view
    addProjectBtn.classList.remove('active');
    deleteProjectBtn.classList.remove('active');
    addProjectPopupBtn.classList.remove('active');
    addPopupBtn.classList.remove('active');
    cancelPopupBtn.classList.remove('active');
}

addProjectBtn.addEventListener('click', () => {
    openPopup();
    cancelPopupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closePopup();
    })
})

const clearElement = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

const save = () => {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

const renderTaskCount = (selectedList) => {
    const incompleteTasksCount = selectedList.tasks.filter(task => !task.complete).length;
    const taskString = incompleteTasksCount === 1 ? "task" : "tasks";
    listCountElement.innerText = `${incompleteTasksCount} ${taskString} remaining`;
}

const renderTasks = (selectedList) => {
    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.title)
        tasksContainer.appendChild(taskElement)
    })
}

const render = () => {
    clearElement(projectsList)
    renderLists()

    const selectedList = lists.find(list => list.id === selectedListId)
    if (selectedListId === null) {
        listDisplayContainer.style.display = 'none';
    } else {
        listDisplayContainer.style.display = '';
        listTitleElement.innerText = selectedList.title;
        renderTaskCount(selectedList)
        clearElement(tasksContainer)
        renderTasks(selectedList)
    }
}

const renderLists = () => {
    lists.forEach((list) => {
        const newTitle = document.createElement('li');
        newTitle.dataset.listId = list.id;
        newTitle.classList.add('title-name');
        newTitle.innerText = list.title;
        if (list.id === selectedListId) {
            newTitle.classList.add('active-list');
        }
        projectsList.appendChild(newTitle);
    })
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
    e.preventDefault();
    const inputText = addProjectPopupInput.value;
    console.log(inputText);
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
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.tasks.push(task);
    saveAndRender();
})

projectsList.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
})

deleteProjectBtn.addEventListener('click', () => {
    lists = lists.filter(list => list.id !== selectedListId);
    selectedListId = null;
    saveAndRender();
})

render();