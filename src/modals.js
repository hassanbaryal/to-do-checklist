import createClipBoard from "./clipBoardCreate.js";



const clipBoardModal = document.querySelector('.clipboard');
const taskModal = document.querySelector('.taskmodal');




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
    taskModal.classList.toggle('visible');
    document.querySelector('html').classList.toggle('modal-visible');
    if (taskModal.classList.contains('edit-mode')) {
        taskModal.classList.toggle('edit-mode');
    };
    if (taskModal.dataset.title !== '') {
        taskModal.setAttribute('data-title', '');
    };
    if (taskModal.dataset.boardtitle !== '') {
        taskModal.setAttribute('data-boardtitle', '');
    };
};



export {toggleClipBoardModal, toggleTaskModal};
