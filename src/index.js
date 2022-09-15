import './styles/main.css';
import './styles/modals.css';
import toggleModals from './modals.js';
import createClipBoard, {clipBoard} from './clipBoardCreate.js';

import logo from './assets/clipboard.svg';
import edit from './assets/edit.svg';
import deleteImg from './assets/trash-2.svg';

document.querySelector('.logo').src = logo;
document.querySelector('.task-edit-btn').src = edit;
document.querySelector('.task-delete-btn').src = deleteImg;
document.querySelector('.clip-board-delete-btn').src = deleteImg;


// ******************************************************************

// Clipboard 
const clipBoardLibrary = () => {
    const library = [];

    const getLibrary = () => {
        return library;
    };

    const addToLibrary = (clipBoard) => {
        library.push(clipBoard);
    };

    const deleteFromLibrary = (title) => {
        //logic to find matching title and pop out of array
    };

    return {getLibrary, addToLibrary, deleteFromLibrary};
};

const cbLibrary = clipBoardLibrary();

const addClipBoardBtn = document.querySelector('.add-clip-board');
const boardForm = document.querySelector('.clip-board-form');
const boardFormSubmitBtn = document.querySelector('.clip-board-form button[type="submit"]');
const boardFormCancelBtn = document.querySelector('.clip-board-form button[type="button"]');
const boardFormInput = document.querySelector('input#title');


addClipBoardBtn.addEventListener('click', () => {
    toggleModals(1);
});

boardFormCancelBtn.addEventListener('click', (e) => {
        boardFormInput.value = '';
        toggleModals(1);
});


boardFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    //e.path[4] selects the modal backdrop html element, where the modal container resides
    if (checkFormValidity(1, boardFormInput.value)) {
        if (!e.path[4].classList.contains('edit-mode')) {
            editClipBoardLibrary(1, boardFormInput.value);
        } else {
            editClipBoardLibrary(0, boardFormInput.value);
        };
        boardFormCancelBtn.click();
    };

    //use e.path[something] (check console log for what that something is) to capture modal
});

const editClipBoardLibrary = (mode, title) => {
    //mode == 1 refers to creating a new clipboard, while mode == 0 refers to editing an existing clipboard
    if (mode) {
        cbLibrary.addToLibrary(createClipBoard(title));
    } else {

    };
};

const checkFormValidity = (whichForm, title) => {
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