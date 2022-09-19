import {format, formatDistance, subDays} from 'date-fns';
import toggleModals, {toggleClipBoardModal} from './modals.js';
import editImg from './assets/edit.svg';
import deleteImg from './assets/trash-2.svg';

// Task object
const task = (node, title, dueDate, priority, description = '') => {
    
    const getNode = () => {return node;};

    const getTitle = () => {return title;};

    const getDueDate = () => {return dueDate;};

    const getPriority = () => {return priority;};

    const getDescription = () => {return description;};

    const setTitle = (newTitle) => {
        title = newTitle;
        editTaskTitle(node, title);
    };

    const setDueDate = (newDueDate) => {
        dueDate = newDueDate;
        editTaskDueDate(node, dueDate);
    };

    const setPriority = (newPriority) => {
        priority = newPriority;
        editTaskPriority(node, priority);
    };

    const setDescription = (newDescription) => {
        description = newDescription;
        editTaskDescription(node, description);
    };

    return {getNode, getTitle, getDueDate, getPriority, getDescription, setTitle, setDueDate, setPriority, setDescription};
};


const editTaskTitle = (node, newTitle) => {
    
};

const editTaskDueDate = (node, newDueDate) => {
    
};

const editTaskPriority = (node, newPriority) => {
    
};

const editTaskDescription = (node, newDescription) => {
    
};


const createTask = (title, dueDate, priority, description = '') => {
    
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

    addTaskFunctionality(taskNode);
    const newtask = task(taskNode, title, dueDate, priority, description);

    return newtask;
};


const addTaskFunctionality = (node) => {
    //add functionality to completion check box (add completion class to the box, and to the task itself. Add styling to grey out task and cross out the title), task title (just make it click edit button), edit button, and delete button
};

const formatDueDate = (dueDate) => {
    let dueDateFormatted = dueDate.split('-');
    dueDateFormatted = format(new Date(dueDateFormatted[0], dueDateFormatted[1], dueDateFormatted[2]), 'MMM do, yyyy');
    return dueDateFormatted;
};

export default task;
export {createTask};