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

eval("const LOCAL_STORAGE_LIST_KEY = 'task.lists';\r\nconst LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'\r\n\r\nlet lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];\r\nlet selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)\r\n\r\n// New projects list\r\nconst projectsList = document.querySelector('#projects-list');\r\n// Add/delete project - functionality\r\nconst addProjectBtn = document.querySelector('#button-add-project');\r\nconst deleteProjectBtn = document.querySelector('#button-delete-project');\r\n// Add project - popup\r\nconst addProjectPopupBtn = document.querySelector('#add-project-popup');\r\nconst addPopupBtn = document.querySelector('#button-add-project-popup');\r\nconst cancelPopupBtn = document.querySelector('#button-cancel-project-popup');\r\n// Form & Input inside popup \r\nconst AddProjectForm = document.querySelector('#form-add-project');\r\nconst addProjectPopupInput = document.querySelector('#input-add-project-popup');\r\n\r\nconst openPopup = () => {\r\n    // Open pop-up view\r\n    addProjectBtn.classList.add('active');\r\n    deleteProjectBtn.classList.add('active');\r\n    addProjectPopupBtn.classList.add('active');\r\n    addPopupBtn.classList.add('active');\r\n    cancelPopupBtn.classList.add('active');\r\n}\r\n\r\nconst closePopup = () => {\r\n    // Close pop-up view\r\n    addProjectBtn.classList.remove('active');\r\n    deleteProjectBtn.classList.remove('active');\r\n    addProjectPopupBtn.classList.remove('active');\r\n    addPopupBtn.classList.remove('active');\r\n    cancelPopupBtn.classList.remove('active');\r\n}\r\n\r\naddProjectBtn.addEventListener('click', () => {\r\n    openPopup();\r\n    cancelPopupBtn.addEventListener('click', (e) => {\r\n        e.preventDefault()\r\n        closePopup();\r\n    })\r\n})\r\n\r\nconst clearElement = (element) => {\r\n    while (element.firstChild) {\r\n        element.removeChild(element.firstChild)\r\n    }\r\n}\r\n\r\nconst save = () => {\r\n    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));\r\n}\r\n\r\nconst render = () => {\r\n    clearElement(projectsList)\r\n    lists.forEach((list) => {\r\n        const newTitle = document.createElement('li');\r\n        newTitle.dataset.listId = list.id;\r\n        newTitle.classList.add('title-name');\r\n        newTitle.innerText = list.title;\r\n        if (list.id === selectedListId) {\r\n            newTitle.classList.add('active-list')\r\n        }\r\n        projectsList.appendChild(newTitle);\r\n    })\r\n}\r\n\r\nconst saveAndRender = () => {\r\n    save();\r\n    render();\r\n}\r\n\r\nconst createTitle = (title) => {\r\n    return {\r\n        id: Date.now().toString(),\r\n        title: title,\r\n        tasks: []\r\n    }\r\n}\r\n\r\nAddProjectForm.addEventListener('submit', (e) => {\r\n    e.preventDefault()\r\n    const inputText = addProjectPopupInput.value;\r\n    console.log(inputText);\r\n    if (inputText === null || inputText === '') return\r\n    const list = createTitle(inputText);\r\n    addProjectPopupInput.value = null;\r\n    lists.push(list);\r\n    saveAndRender();\r\n})\r\n\r\nprojectsList.addEventListener('click', e => {\r\n    if (e.target.tagName.toLowerCase() === 'li') {\r\n        selectedListId = e.target.dataset.listId;\r\n        saveAndRender();\r\n    }\r\n})\r\n\r\ndeleteProjectBtn.addEventListener('click', () => {\r\n    lists = lists.filter(list => list.id !== selectedListId);\r\n    selectedListId = null;\r\n    saveAndRender();\r\n})\r\n\r\nrender();\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

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