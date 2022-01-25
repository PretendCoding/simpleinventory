import { deleteItem, confirmDelete } from "./deleteItem.js";

/**
 * 
 * @param {string} elemId ID of element to be looked up
 * @returns {HTMLElement}
 */
export function $(elemId) {
    return document.getElementById(elemId);
}

export function closeModal() {
    $('addItemModal').style.display = 'none';     
    $('updateItemModal').style.display = 'none';        
    $('modalBackground').style.display = 'none';
    $('confirmDeleteMessage').style.display = 'none';
    $('deleteItemConfirmButton').removeEventListener('click', deleteItem);
    $('deleteItemConfirmButton').addEventListener('click', confirmDelete);
}

/**
 * 
 * @param {boolean} errorOccured Whether an error occured or not
 * @param {HTMLElement} inputElem Input element throwing the potential error
 * @param {HTMLElement} buttonElem Button to be enabled/disabled
 * @param {HTMLElement} errorMessageElem Error message element ID
 */
export function handleItemInputErrors(errorOccured, inputElem, buttonElem, errorMessageElem) {
    if (errorOccured) {
        inputElem.classList.add('input-error');
        buttonElem.disabled = true;
        errorMessageElem.classList.remove('hidden');
        return true;
    } else {
        inputElem.classList.remove('input-error');
        buttonElem.disabled = false;
        errorMessageElem.classList.add('hidden');
        return false;
    }
}