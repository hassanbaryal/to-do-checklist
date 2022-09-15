import deleteImg from './assets/trash-2.svg';
import './modals.js';



// Clipboard object
const clipBoard = (title, node) => {
    //variable that stores all the tasks the clipboard contains
    const tasks = [];

    const getTitle = () => {return title};

    const changeTitle = (newTitle) => {
        title = newTitle;
    };

    const getNode = () => {return node};

    const addTask = (task) => {
        tasks.push(task);
        //call dom manipulation to add task to clipboard in dom (send node and task)
    };

    const deleteTask = (id) => {
        //logic to find correct task in tasks array, send to dom manipulation function to delete it from html, and then delete it from tasks array
    };

    const deleteClipBoard = () => {

    };

    //function to delete clipboard itself? (point to node in DOM)    
    return {getTitle, getNode, deleteClipBoard};
};



const clipBoardModal = document.querySelector('.modal.clipboard');

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
    //Create clipBoard html when add clipboard btn is pressed
    //
    const board = clipBoard(title, clipBoardNode);
    addClipBoardFunctionality(board);
    
    return board;
};

//createClipBoard calls function that adds functionality to certain elements i.e. createClipBoard sends the node and adds functionality to clipboard title(when clicked, modal pops up to change title), and delete clipboard button

//This function adds functionality to the title, delete button of the clipboard, and add functionality to add task button
const addClipBoardFunctionality = (board) => {
    const title = board.getNode().querySelector('.clip-board-title h1');
    title.addEventListener('click', (e) => {
        clipBoardModal.classList.toggle('visible');
        clipBoardModal.classList.toggle('edit-mode');
        // document.querySelector('html');
    });

    const deleteBtn = board.getNode().querySelector('.clip-board-delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        board.deleteClipBoard();
    });

    const addTaskBtn = board.getNode().querySelector('.add-task');
    addTaskBtn.addEventListener('click', ()=> {
        // make task modal popup

    });
};


// Dom manipulation (2 functions?). 1 for deleting tasks, and 1 for adding. MAYBE ADD THE FUNCTIONS IN TASKS.JS



//ADD CLIPBOARD MODAL STUFF HERE
//modals js for two functions for clipboard title: one for new clip board, and one for edit clipboard title. If edit is clicked, send id of clipboard clicked and toggle edit-title class for modal

export default createClipBoard;
export {clipBoard};