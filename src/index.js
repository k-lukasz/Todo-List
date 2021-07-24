const LOCAL_STORAGE_LIST_KEY = 'task.lists';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

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
        e.preventDefault()
        closePopup();
    })
})

const clearElement = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

const save = () => {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

const render = () => {
    clearElement(projectsList)
    lists.forEach((list, index) => {
        const newTitle = document.createElement('li');
        newTitle.id = index;
        newTitle.classList.add('title-name');
        newTitle.innerText = list.title;
        projectsList.appendChild(newTitle);
    })
}

const saveAndRender = () => {
    save();
    render();
}

const createTitle = (title, index) => {
    return {
        id: title[index],
        title: title,
        tasks: []
    }
}

AddProjectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputText = addProjectPopupInput.value;
    console.log(inputText);
    if (inputText === null || inputText === '') return
    const list = createTitle(inputText);
    addProjectPopupInput.value = null;
    lists.push(list);
    saveAndRender();
})

render()