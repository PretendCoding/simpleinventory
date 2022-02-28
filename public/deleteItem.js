import { $, closeModal } from "./utilities.js";
import { deleteOneItem } from "./ajaxRequests/delete.js";

const stateChange1 = setInterval(() => {
    if (document.readyState == 'complete'){
        clearInterval(stateChange1);
        main();
    }
}, 100);

function main() {

    $('deleteItemConfirmButton').addEventListener('click', confirmDelete);
    
}

export function confirmDelete() {
    $('confirmDeleteMessage').style.display = 'block';
    $('deleteItemConfirmButton').removeEventListener('click', confirmDelete);
    $('deleteItemConfirmButton').addEventListener('click', deleteItem);
}

export async function deleteItem(event) {
    await deleteOneItem({_id:$('itemIdUpdate')._id});

    const _id = $('itemIdUpdate')._id;

    const container = document.querySelector('[data-inventory-container]');

    const nodes = container.childNodes;

    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i]._id == _id) {
            nodes[i].remove();
            break;
        }
    }

    $('deleteItemConfirmButton').removeEventListener('click', deleteItem);
    $('deleteItemConfirmButton').addEventListener('click', confirmDelete);
    closeModal();
    // Need to refresh the table still
}