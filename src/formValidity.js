
const checkBoardFormValidity = (boardForm, cbLibrary, title) => {
    // form = 1 refers to clip board form, form = 0 refers to task form

    // Check to ensure title is between 1-25 characters
    if (boardForm.checkValidity()) {
        // Check to ensure existing clipboards dont have the same title
        if (cbLibrary.getLibrary().findIndex((board) => { return board.getTitle() == title }) == -1) {
            return true;
        } else {
            alert('Clipboards cannot have the same title!');
        };
    } else {
        alert('Invalid Submission! Ensure character length of 1-24');
    };


    return false;
};

const checkTaskFormValidity = (taskForm, cbLibrary, boardTitle, taskTitle, editmode) => {
    if (taskForm.checkValidity()) {
        const board = cbLibrary.getLibrary().find((board) => {return board.getTitle() == boardTitle});
        
        if (board.getTasks().findIndex(task => {
            return task.getTitle() == taskTitle}) == -1 || editmode) {
                return true;
        } else {
            alert('Tasks in the same clipboard cannot have the same title!');
        };
    } else {
        alert('Ensure completion of required fields! (Markerd by *)');
    };
    return false;
};

export {checkBoardFormValidity, checkTaskFormValidity};