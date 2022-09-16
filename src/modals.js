import createClipBoard from "./clipBoardCreate.js";



const clipBoardModal = document.querySelector('.clipboard');




// Add a third paramter for
const toggleModals = (whichModal, currentTitle) => {
    // modal = 1 refers to clipboard modal, while modal = 0 refers to task modal
    if (whichModal) {
        clipBoardModal.classList.toggle('visible');
        if (clipBoardModal.classList.contains('edit-mode')) {
            clipBoardModal.classList.toggle('edit-mode');
        };
    } else {

    };
    document.querySelector('html').classList.toggle('modal-visible');
};

const toggleClipBoardModal = () => {
    clipBoardModal.classList.toggle('visible');
    document.querySelector('html').classList.toggle('modal-visible');
    if (clipBoardModal.classList.contains('edit-mode')) {
            clipBoardModal.classList.toggle('edit-mode');
    };
    if (clipBoardModal.dataset.title !== '') {
        clipBoardModal.setAttribute('data-title', '');
    };
};

const toggleTaskModal = () => {

};



export default toggleModals;
export {toggleClipBoardModal, toggleTaskModal};
