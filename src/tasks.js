import {format, formatDistance, subDays} from 'date-fns';
import {toggleTaskModal} from './modals.js';
import { deleteTaskFromBoard } from './clipBoardCreate.js';
import editImg from './assets/edit.svg';
import deleteImg from './assets/trash-2.svg';

// Task object
const task = (boardTitle, node, title, dueDate, priority, description = '') => {
    
    const getBoardTitle = () => {return boardTitle};

    const getNode = () => {return node;};

    const getTitle = () => {return title;};

    const getDueDate = () => {return dueDate;};

    const getPriority = () => {return priority;};

    const getDescription = () => {return description;};

    const setBoardTitle = (newBoardTitle) => {
        boardTitle = newBoardTitle;
    };

    const setTitle = (newTitle) => {
        title = newTitle;
        editTaskTitle(node, title);
    };

    const setDueDate = (newDueDate) => {
        dueDate = newDueDate;
        editTaskDueDate(node, dueDate);
    };

    const setPriority = (newPriority) => {
        editTaskPriority(node, priority, newPriority);
        priority = newPriority;
    };

    const setDescription = (newDescription) => {
        description = newDescription;
    };

    return {getBoardTitle, getNode, getTitle, getDueDate, getPriority, getDescription, setBoardTitle, setTitle, setDueDate, setPriority, setDescription};
};

const taskModal = document.querySelector('.modal.taskmodal');
const taskInputs = taskModal.querySelectorAll('.task-form input, #task-priority, #task-description');

const editTaskTitle = (node, newTitle) => {
    node.querySelector('.task-title').textContent = newTitle;
};

const editTaskDueDate = (node, newDueDate) => {
    node.querySelector('.due-date').textContent = formatDueDate(newDueDate);
};

const editTaskPriority = (node, currentPriority, newPriority) => {
    node.classList.toggle(`priority-${currentPriority}`);
    node.classList.toggle(`priority-${newPriority}`);
};



const createTask = (boardTitle, title, dueDate, priority, description = '') => {
    
    let dueDateFormatted = formatDueDate(dueDate);

    const taskNode = document.createElement('div');
    taskNode.classList.toggle('task');
    taskNode.classList.toggle('clip-board-content');
    taskNode.classList.toggle(`priority-${priority}`);
    taskNode.id = title;

    taskNode.insertAdjacentHTML('beforeend',`<div class="completion-check-box"></div>`);
    taskNode.insertAdjacentHTML('beforeend',`<div class="task-title">${title}</div>`);
    taskNode.insertAdjacentHTML('beforeend',`<p class="task-due-date">Due: <span class="due-date">${dueDateFormatted}</span></p>`);
    taskNode.insertAdjacentHTML('beforeend',`<img alt="Edit button" class="task-edit-btn">`);
    taskNode.querySelector('.task-edit-btn').src = editImg;
    taskNode.insertAdjacentHTML('beforeend',`<img alt="Delete task button" class="task-delete-btn">`);
    taskNode.querySelector('.task-delete-btn').src = deleteImg;

    
    const newTask = task(boardTitle, taskNode, title, dueDate, priority, description);
    addTaskFunctionality(newTask, taskNode);

    return newTask;
};


const addTaskFunctionality = (newTask, node) => {
    //add functionality to completion check box (add completion class to the box, and to the task itself. Add styling to grey out task and cross out the title), task title (just make it click edit button), edit button, and delete button
    

    const completionBox = node.querySelector('.completion-check-box');
    completionBox.addEventListener('click', (e) => {
        completionBox.classList.toggle('complete');
        node.classList.toggle('complete');
    });

    const editBtn = node.querySelector('.task-edit-btn');
    editBtn.addEventListener('click', (e) => {
        toggleTaskModal();
        taskModal.classList.toggle('edit-mode');
        taskModal.setAttribute('data-title', `${newTask.getTitle()}`);
        taskModal.setAttribute('data-boardtitle', `${newTask.getBoardTitle()}`);
        taskInputs[0].value = newTask.getTitle();
        taskInputs[1].value = newTask.getDueDate();
        taskInputs[2].value = newTask.getPriority();
        taskInputs[3].value = newTask.getDescription();
    });

    const title = node.querySelector('.task-title');
    title.addEventListener('click', (e) => {
        editBtn.click();
    });

    const deleteBtn = node.querySelector('.task-delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        newTask.getNode().remove();
        deleteTaskFromBoard(newTask, newTask.getBoardTitle());
    });
};

const formatDueDate = (dueDate) => {
    let dueDateFormatted = dueDate.split('-');
    dueDateFormatted = format(new Date(dueDateFormatted[0], (Number(dueDateFormatted[1]) - 1), dueDateFormatted[2]), 'MMM do, yyyy');
    return dueDateFormatted;
};

export default task;
export {createTask};