import deleteImg from './assets/trash-2.svg';

// Clipboard object
const clipBoard = (title, node) => {
    //variable that stores all the tasks the clipboard contains
    const tasks = [];

    const getTitle = () => {return title};

    const changeTitle = (newTitle) => {
        title = newTitle;
    };

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
    return;
};

// Creates clipboard html, and creates clipboard object?
const createClipBoard = (title) => {
    // const clipBoard = clipBoard(title, document.createElement('div'));
    const clipBoardNode = document.createElement('div');
    clipBoardNode.classList.toggle('clip-board');
    clipBoardNode.id = title;
    clipBoardNode.insertAdjacentHTML('beforeend',`<div class="clip-board-title"><h1>${title}</h1></div>`);
    clipBoardNode.insertAdjacentHTML('beforeend',`<div class="clip-board-tasks"><button type="button" class="add-task clip-board-content">+ Task</button></div>`);
    clipBoardNode.insertAdjacentHTML('beforeend',`<img alt="Delete Clipboard button" class="clip-board-delete-btn">`);
    clipBoardNode.querySelector('.clip-board-delete-btn').src = deleteImg;
    console.log(clipBoardNode);
    document.querySelector('.add-clip-board').parentNode.insertBefore(clipBoardNode, document.querySelector('.add-clip-board'));
    //Create clipBoard html when add clipboard btn is pressed
    //

    //at the end, createClipBoard creates the clipBoard object and returns it
};

//createClipBoard calls function that adds functionality to certain elements i.e. createClipBoard sends the node and adds functionality to clipboard title(when clicked, modal pops up to change title), and delete clipboard button

//This function adds functionality to the title and delete button of the clipboard
const addClipBoardFunctionality = (clipBoardNode) => {
    
};


// Dom manipulation (2 functions?). 1 for deleting tasks, and 1 for adding


//ADD CLIPBOARD MODAL STUFF HERE
//modals js for two functions for clipboard title: one for new clip board, and one for edit clipboard title. If edit is clicked, send id of clipboard clicked and toggle edit-title class for modal

export default createClipBoard;