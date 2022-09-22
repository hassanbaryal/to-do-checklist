



let counter = 0;
let storageAvailability = storageAvailable('localStorage');

if (storageAvailability) {
    if (!localStorage.length) {
        //if there is something in storage. Each object will either be a clipboard or task. Each object will have 'type' key, with the value being either clipboard or task. Each will call different functions
    
    } else {
        //if there isn't
    };
};



const populateStorageWithBoard = (board) => {
    if (storageAvailability) {
        counter++;
        localStorage.setItem(`board${counter}`,
            JSON.stringify({
                type: 'board',
                title: board.getTitle(),
            })
        );
    };
};

const populateStorageWithTask = (task) => {
    if (storageAvailability) {
        counter++;
        localStorage.setItem(`task${counter}`, JSON.stringify({
            type: `task${counter}`,
            boardTitle: task.getTitle(),
            title: task.getTitle(),
            dueDate: task.getDueDate(),
            priority: task.getPriority(),
            decription: task.getDescription(),
        })
        );
    };

};

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}