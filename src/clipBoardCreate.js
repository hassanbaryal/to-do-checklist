import deleteImg from './assets/trash-2.svg';
import {toggleClipBoardModal, toggleTaskModal} from './modals.js';
import {populateStorageWithBoard, editBoardInStorage, deleteBoardInStorage} from './localStorage.js';

// Clipboard library object
const clipBoardLibrary = () => {
    const library = [];

    const getLibrary = () => {
        return library;
    };

    const addToLibrary = (clipBoard) => {
        library.push(clipBoard);
    };

    const deleteFromLibrary = (boardToDelete) => {
        let index = library.findIndex(board => board.getTitle() === boardToDelete.getTitle());
        library.splice(index, 1);
    };

    return {getLibrary, addToLibrary, deleteFromLibrary};
};



// Clipboard object
const clipBoard = (title, node) => {
    //variable that stores all the tasks the clipboard contains
    const tasks = [];

    const getTasks = () => {
        return tasks;
    };

    const getTitle = () => {return title};

    const changeTitle = (newTitle) => {
        title = newTitle;
        changeTitleDOM(title, node);
    };

    const getNode = () => {return node};

    const addTask = (task) => {
        tasks.push(task);
        addTaskToClipBoardHtml(node, task);
    };

    const deleteTask = (taskToDelete) => {
        //logic to find correct task in tasks array, send to dom manipulation function to delete it from html, and then delete it from tasks array
        let index = tasks.findIndex(task => task.getTitle() === taskToDelete.getTitle());
        tasks.splice(index, 1);
    };


    //function to delete clipboard itself? (point to node in DOM)    
    return {getTasks, getTitle, changeTitle, getNode, addTask, deleteTask};
};

const cbLibrary = clipBoardLibrary();
const addClipBoardBtn = document.querySelector('.add-clip-board');
const clipBoardModal = document.querySelector('.modal.clipboard');
const taskModal = document.querySelector('.modal.taskmodal');

addClipBoardBtn.addEventListener('click', () => {
    toggleClipBoardModal();
});

const editClipBoardLibrary = (cbLibrary, mode, newTitle, currentTitle = '') => {
    //mode == 1 refers to creating a new clipboard, while mode == 0 refers to editing an existing clipboard
    if (mode) {
        cbLibrary.addToLibrary(createClipBoard(newTitle));
    } else {
        cbLibrary.getLibrary().forEach(board => {console.log(board, board.getTitle())});
        // console.log(currentTitle)
        // const board = cbLibrary.getLibrary().find(board => {return board.getTitle() == currentTitle});
        // console.log(board);
        // board.changeTitle(newTitle);
    };
};

const addToClipBoardLibrary = (cbLibrary, newTitle) => {
    cbLibrary.addToLibrary(createClipBoard(newTitle));
};

const editInClipBoardLibrary = (cbLibrary, newTitle) => {
    const board = cbLibrary.getLibrary().find(board => {
        return board.getTitle() === clipBoardModal.dataset.title;
    });
    // Update localStorage if possible
    editBoardInStorage(board, newTitle);
    board.changeTitle(newTitle);
    board.getTasks().forEach(task => task.setBoardTitle(newTitle));
};

// Creates clipboard html, and creates clipboard object?
const createClipBoard = (title) => {
    // const clipBoard = clipBoard(title, document.createElement('div'));
    const clipBoardNode = document.createElement('div');
    clipBoardNode.classList.toggle('clip-board');
    clipBoardNode.id = title;
    // Add clipboard title
    clipBoardNode.insertAdjacentHTML('beforeend',`<div class="clip-board-title"><h1>${title}</h1></div>`);
    // Add task container and + task button
    clipBoardNode.insertAdjacentHTML('beforeend',`<div class="clip-board-tasks"><button type="button" class="add-task clip-board-content">+ Task</button></div>`);
    // Add delete clipboard button
    clipBoardNode.insertAdjacentHTML('beforeend',`<img alt="Delete Clipboard button" class="clip-board-delete-btn">`);
    clipBoardNode.querySelector('.clip-board-delete-btn').src = deleteImg;
    // Insert node before add clipboard btn
    document.querySelector('.add-clip-board').parentNode.insertBefore(clipBoardNode, document.querySelector('.add-clip-board'));
    
    const board = clipBoard(title, clipBoardNode);
    addClipBoardFunctionality(board);
    return board;
};

//This function adds functionality to the title, delete button of the clipboard, and add functionality to add task button
const addClipBoardFunctionality = (board) => {
    const title = board.getNode().querySelector('.clip-board-title h1');
    title.addEventListener('click', (e) => {
        toggleClipBoardModal();
        clipBoardModal.classList.toggle('edit-mode');
        clipBoardModal.setAttribute('data-title', `${board.getTitle()}`);
    });

    const deleteBtn = board.getNode().querySelector('.clip-board-delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        // Update localStorage if possible
        deleteBoardInStorage(board);

        board.getNode().remove();
        deleteBoardFromLibrary(board);
    });

    const addTaskBtn = board.getNode().querySelector('.add-task');
    addTaskBtn.addEventListener('click', ()=> {
        // make task modal popup
        toggleTaskModal();
        taskModal.setAttribute('data-boardTitle', `${board.getTitle()}`);
    });
};

const changeTitleDOM = (title, node) => {
    node.querySelector('.clip-board-title h1').textContent = title;
};


const addTaskToClipBoardHtml = (boardNode, task) => {
    boardNode.querySelector('.add-task').parentNode.insertBefore(task.getNode(), boardNode.querySelector('.add-task'));
    //insert task html before add task button
};


const deleteTaskFromBoard = (taskToDelete, boardTitle) => {
    const board = cbLibrary.getLibrary().find(board => board.getTitle() === boardTitle);
    board.deleteTask(taskToDelete);
};

const deleteBoardFromLibrary = (boardToDelete) => {
    cbLibrary.deleteFromLibrary(boardToDelete);
};

//ADD CLIPBOARD MODAL STUFF HERE
//modals js for two functions for clipboard title: one for new clip board, and one for edit clipboard title. If edit is clicked, send id of clipboard clicked and toggle edit-title class for modal

export default cbLibrary;
export {clipBoardLibrary, editInClipBoardLibrary, addToClipBoardLibrary, clipBoard, deleteTaskFromBoard};