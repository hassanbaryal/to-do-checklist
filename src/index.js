import './styles/main.css';
import './styles/modals.css';
import logo from './assets/clipboard.svg';
import {toggleClipBoardModal, toggleTaskModal} from './modals.js';
import cbLibrary, {editInClipBoardLibrary, addToClipBoardLibrary} from './clipBoardCreate.js';
import { createTask } from './tasks';
import { checkBoardFormValidity, checkTaskFormValidity } from './formValidity.js';
import {storageAvailability, populateStorageWithBoard, populateStorageWithTask, editTaskInStorage} from './localStorage.js';

document.querySelector('.logo').src = logo;

(() => {
    if (storageAvailability) {
        // Two seperate for loops because objects are reordered, and theres no gaurantee that the task being created has its associated clipboard already created
        for (let i = 0; i < localStorage.length; i++) {
            const object = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (object.type === 'board') {
                addToClipBoardLibrary(cbLibrary, object.title);
            };
        };
    
        for (let i = 0; i < localStorage.length; i++) {
            const object = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (object.type === 'task') {
                const board = cbLibrary.getLibrary().find(board => {
                    return board.getTitle() == object.boardTitle;
                });
                board.addTask(createTask(object.boardTitle, object.title, object.dueDate, object.priority, object.description));
                console.log(object.boardTitle, object.title, object.dueDate, object.priority, object.description);
            };
        };
    };
    
})();

const boardForm = document.querySelector('.clip-board-form');
const boardFormSubmitBtn = document.querySelector('.clip-board-form button[type="submit"]');
const boardFormCancelBtn = document.querySelector('.clip-board-form button[type="button"]');
const boardFormInput = document.querySelector('input#title');

const taskForm = document.querySelector('.task-form');
const taskFormSubmitBtn = document.querySelector('.task-form button[type="submit"]');
const taskFormCancelBtn = document.querySelector('.task-form button[type="button"]');
const taskFormInputs = document.querySelectorAll('.task-form input, #task-priority, #task-description');

boardFormCancelBtn.addEventListener('click', (e) => {
    boardFormInput.value = '';
    toggleClipBoardModal();
});

boardFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    //e.composedPath[4] selects the modal backdrop html element, where the modal container resides
    if (checkBoardFormValidity(boardForm, cbLibrary, boardFormInput.value)) {
        if (!e.composedPath()[4].classList.contains('edit-mode')) {
            addToClipBoardLibrary(cbLibrary, boardFormInput.value);
            // Update localStorage if possible
            populateStorageWithBoard(cbLibrary.getLibrary().at(-1));
        } else {
            editInClipBoardLibrary(cbLibrary, boardFormInput.value);
        };
        boardFormCancelBtn.click();
    };
});

taskFormCancelBtn.addEventListener('click',  ()=> {
    taskFormInputs.forEach(input => input.value = '');
    toggleTaskModal();
});

taskFormSubmitBtn.addEventListener('click',  (e)=> {
    e.preventDefault();
    const boardTitle = e.composedPath()[4].dataset.boardtitle; 
    const board = cbLibrary.getLibrary().find(board => {
        return board.getTitle() == boardTitle;
    }); 
    let editmode = e.composedPath()[4].classList.contains('edit-mode') ? true:false;
     if (checkTaskFormValidity(taskForm, cbLibrary, boardTitle, taskFormInputs[0].value, editmode)) {
        if (!editmode) {
            board.addTask(createTask(boardTitle, taskFormInputs[0].value, taskFormInputs[1].value, taskFormInputs[2].value, taskFormInputs[3].value));
            // Update localStorage
            populateStorageWithTask(board.getTasks().at(-1));
        } else {
            const taskTitle = e.composedPath()[4].dataset.title;
            const task = board.getTasks().find(task => task.getTitle() === taskTitle);
            // Update local storage, if available
            editTaskInStorage(task, taskFormInputs[0].value, taskFormInputs[1].value, taskFormInputs[2].value, taskFormInputs[3].value);

            task.setTitle(taskFormInputs[0].value);
            task.setDueDate(taskFormInputs[1].value);
            task.setPriority(taskFormInputs[2].value);
            task.setDescription(taskFormInputs[3].value);
            
        };
        taskFormCancelBtn.click();
     };
    
});