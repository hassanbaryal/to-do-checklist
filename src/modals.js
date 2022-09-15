import createClipBoard from "./clipBoardCreate.js";



const clipBoardModal = document.querySelector('.clipboard');


const toggleModals = (whichModal) => {
    // modal = 1 refers to clipboard modal, while modal = 2 refers to task modal
    if (whichModal) {
        clipBoardModal.classList.toggle('visible');
    } else {

    };
    document.querySelector('html').classList.toggle('modal-visible');
};


export default toggleModals;
