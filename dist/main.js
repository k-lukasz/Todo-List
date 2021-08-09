/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const LOCAL_STORAGE_LIST_KEY = 'task.lists';\r\nconst LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';\r\n\r\nlet lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];\r\nlet selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);\r\n\r\n// New projects list (lists container)\r\nconst projectsList = document.querySelector('#projects-list');\r\n// Add/delete/clear tasks project - functionality\r\nconst addProjectBtn = document.querySelector('#button-add-project');\r\nconst deleteProjectBtn = document.querySelector('#button-delete-project');\r\nconst clearCompletedTasksBtn = document.querySelector('#button-clear-completed-tasks');\r\n// Add project - popup\r\nconst addProjectPopupBtn = document.querySelector('#add-project-popup');\r\nconst addPopupBtn = document.querySelector('#button-add-project-popup');\r\nconst cancelPopupBtn = document.querySelector('#button-cancel-project-popup');\r\n// Form & Input inside popup \r\nconst AddProjectForm = document.querySelector('#form-add-project');\r\nconst addProjectPopupInput = document.querySelector('#input-add-project-popup');\r\n// Add tasks - section\r\nconst listDisplayContainer = document.querySelector('[data-list-display-container]');\r\nconst listTitleElement = document.querySelector('[data-list-title]');\r\nconst listCountElement = document.querySelector('[data-list-count]');\r\nconst tasksContainer = document.querySelector('[data-tasks]');\r\nconst taskTemplate = document.querySelector('#task-template');\r\nconst newTaskForm = document.querySelector('[data-new-task-form]');\r\nconst newTaskInput = document.querySelector('[data-new-task-input]');\r\n\r\nconst openPopup = () => {\r\n    // Open pop-up view\r\n    addProjectBtn.classList.add('active');\r\n    deleteProjectBtn.classList.add('active');\r\n    addProjectPopupBtn.classList.add('active');\r\n    addPopupBtn.classList.add('active');\r\n    cancelPopupBtn.classList.add('active');\r\n    clearCompletedTasksBtn.classList.add('active');\r\n}\r\n\r\nconst closePopup = () => {\r\n    // Close pop-up view\r\n    addProjectBtn.classList.remove('active');\r\n    deleteProjectBtn.classList.remove('active');\r\n    addProjectPopupBtn.classList.remove('active');\r\n    addPopupBtn.classList.remove('active');\r\n    cancelPopupBtn.classList.remove('active');\r\n    clearCompletedTasksBtn.classList.remove('active');\r\n}\r\n\r\naddProjectBtn.addEventListener('click', () => {\r\n    // Close/Open pop-up view\r\n    openPopup();\r\n    cancelPopupBtn.addEventListener('click', (e) => {\r\n        e.preventDefault();\r\n        closePopup();\r\n    })\r\n})\r\n\r\nconst clearElement = (element) => {\r\n    // Clear out all the elements that already exist in Projects List\r\n    // Result is; all those existing elements are removed, only adds a new ones\r\n    while (element.firstChild) {\r\n        element.removeChild(element.firstChild);\r\n    }\r\n}\r\n\r\nconst save = () => {\r\n    // Save function is responsible for saving items&currently choosed elements to localStorage \r\n    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));\r\n    if (selectedListId) {\r\n        localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId); // actually clicked element\r\n    } else {\r\n        localStorage.removeItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);\r\n    }\r\n}\r\n\r\nconst renderTaskCount = (selectedList) => {\r\n    // Display amount of remaining tasks\r\n    const incompleteTasksCount = selectedList.tasks.filter(task => !task.complete).length;\r\n    const taskString = incompleteTasksCount === 1 ? \"task\" : \"tasks\";\r\n    listCountElement.innerText = `${incompleteTasksCount} ${taskString} remaining`;\r\n}\r\n\r\nconst renderTasks = (selectedList) => {\r\n    selectedList.tasks.forEach(task => {\r\n        // Rendering(adding) new tasks using template pattern made in html\r\n        const taskElement = document.importNode(taskTemplate.content, true); // true to render everything inside template(not just top of it)\r\n        const checkbox = taskElement.querySelector('input')\r\n        checkbox.id = task.id // checkbox got same id as task element\r\n        checkbox.checked = task.complete // if task is checked = it's marked as complete\r\n        const label = taskElement.querySelector('label')\r\n        label.htmlFor = task.id\r\n        label.append(task.title)\r\n        tasksContainer.appendChild(taskElement)\r\n    })\r\n}\r\n\r\nconst renderLists = () => {\r\n    // Rendering(adding) new Project Lists on the page\r\n    lists.forEach((list) => {\r\n        const newTitle = document.createElement('li');\r\n        newTitle.dataset.listId = list.id;\r\n        newTitle.classList.add('title-name');\r\n        newTitle.innerText = list.title;\r\n        // #1 list.id === selectedListId\r\n        if (list.id === selectedListId) {\r\n            newTitle.classList.add('active-list');\r\n        }\r\n        projectsList.appendChild(newTitle);\r\n    })\r\n}\r\n\r\nconst render = () => {\r\n    clearElement(projectsList)\r\n    renderLists()\r\n\r\n    const selectedList = lists.find(list => list.id === selectedListId)\r\n    if (selectedListId === null) {\r\n        // If Projects List is not selected - hide add task section\r\n        listDisplayContainer.style.display = 'none';\r\n    } else {\r\n        listDisplayContainer.style.display = '';\r\n        listTitleElement.innerText = selectedList.title;\r\n        renderTaskCount(selectedList)\r\n        clearElement(tasksContainer)\r\n        renderTasks(selectedList)\r\n    }\r\n}\r\n\r\nconst saveAndRender = () => {\r\n    save();\r\n    render();\r\n}\r\n\r\nconst createTitle = (title) => {\r\n    return {\r\n        id: Date.now().toString(),\r\n        title: title,\r\n        tasks: []\r\n    }\r\n}\r\n\r\nconst createTask = (title) => {\r\n    return {\r\n        id: Date.now().toString(),\r\n        title: title,\r\n        complete: false\r\n    }\r\n}\r\n\r\nAddProjectForm.addEventListener('submit', (e) => {\r\n    // Creating new List Project based on submit input values\r\n    e.preventDefault();\r\n    const inputText = addProjectPopupInput.value;\r\n    if (inputText === null || inputText === '') return\r\n    const list = createTitle(inputText);\r\n    addProjectPopupInput.value = null;\r\n    lists.push(list);\r\n    saveAndRender();\r\n})\r\n\r\nnewTaskForm.addEventListener('submit', e => {\r\n    e.preventDefault();\r\n    const taskName = newTaskInput.value;\r\n    if (taskName === null || taskName === '') return\r\n    const task = createTask(taskName);\r\n    newTaskInput.value = null;\r\n    const selectedList = lists.find(list => list.id === selectedListId); // list that is currently selected\r\n    selectedList.tasks.push(task); // add a new task to currently selected list\r\n    saveAndRender();\r\n})\r\n\r\nprojectsList.addEventListener('click', e => {\r\n    // Extension to renderLists function, making clicked element on Projects List active\r\n    if (e.target.tagName.toLowerCase() === 'li') {\r\n        // #2 list.id === selectedListId\r\n        selectedListId = e.target.dataset.listId;\r\n        saveAndRender();\r\n    }\r\n})\r\n\r\ntasksContainer.addEventListener('click', e => {\r\n    // Making selected(clicked) tasks active/inactive\r\n    if (e.target.tagName.toLowerCase() === 'input') { // check if clicked on Checkbox\r\n        const selectedList = lists.find(list => list.id === selectedListId);\r\n        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id); // comparate task.id to Checkbox id(e.target.id)\r\n        selectedTask.complete = e.target.checked;\r\n        save();\r\n        renderTaskCount(selectedList);\r\n    }\r\n})\r\n\r\ndeleteProjectBtn.addEventListener('click', () => {\r\n    lists = lists.filter(list => list.id !== selectedListId);\r\n    selectedListId = null;\r\n    saveAndRender();\r\n})\r\n\r\nclearCompletedTasksBtn.addEventListener('click', () => {\r\n    const selectedList = lists.find(list => list.id === selectedListId); // choose actually selected list\r\n    selectedList.tasks = selectedList.tasks.filter(task => !task.complete); // overwrite tasks, so basically keep tasks that are not completed\r\n    saveAndRender();\r\n})\r\n\r\nrender();\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;