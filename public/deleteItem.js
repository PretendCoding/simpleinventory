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

export async function deleteItem() {
    const result = await deleteOneItem({_id:$('itemIdUpdate')._id});
    console.log(result);
    $('deleteItemConfirmButton').removeEventListener('click', deleteItem);
    $('deleteItemConfirmButton').addEventListener('click', confirmDelete);
    closeModal();
}