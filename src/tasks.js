import toggleModals, {toggleClipBoardModal} from './modals.js';
import edit from './assets/edit.svg';
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

export default task;