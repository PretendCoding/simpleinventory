import { find } from "./ajaxRequests/find.js";
import { update } from "./ajaxRequests/update.js";
import { createTable } from "./createInventoryTable.js";
import { $, closeModal, handleItemInputErrors } from "./utilities.js";

export function showUpdateModal(elem) {
    elem.addEventListener('click', (event) => {
        $('updateItemModal').style.display = 'block';     
        $('modalBackground').style.display = 'block';

        let _id = elem.children[0].id;
        let itemId = elem.children[0].textContent;
        let name = elem.children[1].textContent;
        let unitMeasurement = elem.children[2].textContent;
        let quantity = parseInt(elem.children[3].textContent);

        $('itemIdUpdate').value = itemId;
        $('itemIdUpdate')._id = _id;
        $('nameUpdate').value = name;
        $('unitMeasurementUpdate').value = unitMeasurement;
        $('quantityUpdate').value = quantity;
        
    });
}

const stateChange = setInterval(() => {
    if (document.readyState == 'complete'){
        clearInterval(stateChange);
        main();
    }
}, 100);

function main() {

    /// Click Events

    document.getElementById('updateItemAjaxButton').addEventListener('click', updateItem);

    $('updateItemCloseButton').addEventListener('click', () => {
        closeModal();
    });

    /// Focusout Events

    $('itemIdUpdate').addEventListener('focusout', async (e) => {
        let target = e.currentTarget;

        target.classList.remove('input-error');
        $('updateItemAjaxButton').disabled = false;
        $('itemIdErrorAlreadyExists').classList.add('hidden');
        $('itemIdErrorEmpty').classList.add('hidden');

        if (handleItemInputErrors(target.value === '', target, $('updateItemAjaxButton'), $('itemIdErrorEmptyUpdate'))) return;

        const oldResults = await find({_id: target._id});
        const newResults = await find({itemId: target.value});

        let inputError = true;

        if (newResults.length == 0 || oldResults[0]._id == newResults[0]._id) inputError = false;

        if (handleItemInputErrors(inputError, target, $('updateItemAjaxButton'), $('itemIdErrorAlreadyExistsUpdate'))) return;
    });

    $('nameUpdate').addEventListener('focusout', (e) => {
        let target = e.currentTarget;

        target.classList.remove('input-error');
        $('updateItemAjaxButton').disabled = false;
        $('nameErrorEmptyUpdate').classList.add('hidden');

        if (handleItemInputErrors(target.value === '', target, $('updateItemAjaxButton'), $('nameErrorEmptyUpdate'))) return;
    });

    $('unitMeasurementUpdate').addEventListener('focusout', (e) => {
        let target = e.currentTarget;

        target.classList.remove('input-error');
        $('updateItemAjaxButton').disabled = false;
        $('unitErrorEmptyUpdate').classList.add('hidden');

        if (handleItemInputErrors(target.value === '', target, $('updateItemAjaxButton'), $('unitErrorEmptyUpdate'))) return;
    });

    $('quantityUpdate').addEventListener('focusout', (e) => {
        let target = e.currentTarget;

        target.classList.remove('input-error');
        $('updateItemAjaxButton').disabled = false;
        $('quantityErrorEmptyUpdate').classList.add('hidden');

        if (handleItemInputErrors(target.value === '', target, $('updateItemAjaxButton'), $('quantityErrorEmptyUpdate'))) return;
    });

    /// Helper Functions

    async function updateItem() {
        let filter = {
            _id: $('itemIdUpdate')._id,
            itemId: $('itemIdUpdate').value,
            name: $('nameUpdate').value,
            unitMeasurement: $('unitMeasurementUpdate').value,
            quantity: $('quantityUpdate').value
        }

        const result = await update(filter);

        // Loading...
        
        if (result.modifiedCount == 1) {
            const results = await find({});
            createTable(results);
            closeModal();
            $('itemIdUpdate').value = '';
            $('nameUpdate').value = '';
            $('unitMeasurementUpdate').value = '';
            $('quantityUpdate').value = '';
        }
    }

}