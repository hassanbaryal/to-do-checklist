import './styles/main.css';
import './styles/modals.css';
import toggleModals, {toggleClipBoardModal, toggleTaskModal} from './modals.js';
import createClipBoard, {clipBoardLibrary, editInClipBoardLibrary, addToClipBoardLibrary} from './clipBoardCreate.js';
import { createTask } from './tasks';

import logo from './assets/clipboard.svg';
import edit from './assets/edit.svg';
import deleteImg from './assets/trash-2.svg';

document.querySelector('.logo').src = logo;
document.querySelector('.task-edit-btn').src = edit;
document.querySelector('.task-delete-btn').src = deleteImg;
document.querySelector('.clip-board-delete-btn').src = deleteImg;


// ******************************************************************



const cbLibrary = clipBoardLibrary();

const boardForm = document.querySelector('.clip-board-form');
const boardFormSubmitBtn = document.querySelector('.clip-board-form button[type="submit"]');
const boardFormCancelBtn = document.querySelector('.clip-board-form button[type="button"]');
const boardFormInput = document.querySelector('input#title');

const taskForm = document.querySelector('.task-form');
const taskFormSubmitBtn = document.querySelector('.task-form button[type="submit"]');
const taskFormCancelBtn = document.querySelector('.task-form button[type="button"]');
const taskFormInputs = document.querySelectorAll('.task-form input, #task-priority, #task-description');
console.log(taskFormInputs);

boardFormCancelBtn.addEventListener('click', (e) => {
    boardFormInput.value = '';
    toggleClipBoardModal();
});


boardFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    //e.path[4] selects the modal backdrop html element, where the modal container resides
    if (checkFormValidity(cbLibrary, 1, boardFormInput.value)) {
        if (!e.composedPath()[4].classList.contains('edit-mode')) {
            addToClipBoardLibrary(cbLibrary, boardFormInput.value);
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

     if (checkTaskFormValidity(cbLibrary, boardTitle, taskFormInputs[0].value)) {
        if (!e.composedPath()[4].classList.contains('edit-mode')) {
            board.addTask(createTask(taskFormInputs[0].value, taskFormInputs[1].value, taskFormInputs[2].value, taskFormInputs[3].value));
        } else {
            //edit task
        };
        taskFormCancelBtn.click();
     };
    console.log(e.composedPath()[4].classList);
});

const checkFormValidity = (cbLibrary, whichForm, title) => {
    // form = 1 refers to clip board form, form = 0 refers to task form
    if (whichForm) {
        // Check to ensure title is between 1-25 characters
        if (boardForm.checkValidity()) {
            // Check to ensure existing clipboards dont have the same title
            if (cbLibrary.getLibrary().findIndex((board) => {return board.getTitle() == title}) == -1) {
                return true;
            } else {
                alert('Clipboards cannot have the same title!');
            };
        } else {
            alert('Invalid Submission! Ensure character length of 1-24');
        };
    } else {
        //logic for task form validity
    };

    return false;
};


const checkTaskFormValidity = (cbLibrary, boardTitle, taskTitle) => {
    if (taskForm.checkValidity()) {
        const board = cbLibrary.getLibrary().find((board) => {return board.getTitle() == boardTitle});
        console.log(boardTitle);
        console.log(board);
        
        if (board.getTasks().findIndex(task => {
            return task.getTitle() == taskTitle}) == -1) {
                return true;
        } else {
            alert('Tasks in the same clipboard cannot have the same title!');
        };
    } else {
        alert('Ensure completion of required fields! (Markerd by *)');
    };
    return false;
};