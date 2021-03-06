import { find } from "./ajaxRequests/find.js";
import { add } from "./ajaxRequests/add.js";
import { addItemToTable, createTable } from "./createInventoryTable.js";
import { $, closeModal, handleItemInputErrors } from "./utilities.js"

const stateChange = setInterval(() => {
    if (document.readyState == 'complete'){
        clearInterval(stateChange);
        main();
    }
}, 100);

function main() {

    /// Click Events

    $('addItemCloseButton').addEventListener('click', closeModal);

    $('addItemButton').addEventListener('click', () => {
        $('addItemModal').style.display = 'block';     
        $('modalBackground').style.display = 'block';
        $('addItemAjaxButton').addEventListener('click', addItem);
    });

    /// Focusout Events

    $('itemIdAdd').addEventListener('focusout', async (e) => {
        let target = e.currentTarget;

        target.classList.remove('input-error');
        $('addItemAjaxButton').disabled = false;
        $('itemIdErrorAlreadyExists').classList.add('hidden');
        $('itemIdErrorEmpty').classList.add('hidden');

        if (handleItemInputErrors(target.value === '', target, $('addItemAjaxButton'), $('itemIdErrorEmpty'))) return;

        const results = await find({itemId: e.currentTarget.value});
        if (handleItemInputErrors(results.length !== 0, target, $('addItemAjaxButton'), $('itemIdErrorAlreadyExists'))) return;
    });

    $('nameAdd').addEventListener('focusout', (e) => {
        let target = e.currentTarget;

        target.classList.remove('input-error');
        $('addItemAjaxButton').disabled = false;
        $('nameErrorEmpty').classList.add('hidden');

        if (handleItemInputErrors(target.value === '', target, $('addItemAjaxButton'), $('nameErrorEmpty'))) return;
    });

    $('unitMeasurementAdd').addEventListener('focusout', (e) => {
        let target = e.currentTarget;

        target.classList.remove('input-error');
        $('addItemAjaxButton').disabled = false;
        $('unitErrorEmpty').classList.add('hidden');

        if (handleItemInputErrors(target.value === '', target, $('addItemAjaxButton'), $('unitErrorEmpty'))) return;
    });

    $('quantityAdd').addEventListener('focusout', (e) => {
        let target = e.currentTarget;

        target.classList.remove('input-error');
        $('addItemAjaxButton').disabled = false;
        $('quantityErrorEmpty').classList.add('hidden');

        if (handleItemInputErrors(target.value === '', target, $('addItemAjaxButton'), $('quantityErrorEmpty'))) return;
    });

    /// Helper Functions

    async function addItem() {
        let filter = {
            itemId: $('itemIdAdd').value,
            name: $('nameAdd').value,
            unitMeasurement: $('unitMeasurementAdd').value,
            quantity: $('quantityAdd').value,
            image: $('itemImage').files[0].name
        }
        
        for (var key in filter) {
            if (filter[key] == '') {
                console.error(`Filter cannot contain empty values`);
                return;
                // This needs user forward error handling
            }            
        }
        
        const formData = new FormData();
        formData.append('image', $('itemImage').files[0]);
        
        const result = await add(filter, formData);

        // Make another fetch call to something like /saveImage or whatever which actually saves the image to the server
        // After that I need to make sure it's pointing to the correct path when it tries to find the image
        // Also, the addItemToTable needs to be reworked since it's still trying to use table element

        addItemToTable(result);
        $('itemIdAdd').value = '';
        $('nameAdd').value = '';
        $('unitMeasurementAdd').value = '';
        $('quantityAdd').value = '';
        $('itemImage').value = '';

        closeModal();
    }

}