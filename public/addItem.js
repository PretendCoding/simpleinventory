import { find } from "./ajaxRequests/find.js";
import { add } from "./ajaxRequests/add.js";
import { addItemToTable } from "./createInventoryTable.js";

const stateChange = setInterval(() => {
    if (document.readyState == 'complete'){
        clearInterval(stateChange);
        main();
    }
}, 100);

function main() {

    const $ = (elemId) => document.getElementById(elemId);

    $('addItemCloseButton').addEventListener('click', () => {
        $('addItemModal').style.display = 'none';        
        $('modalBackground').style.display = 'none';        
    });

    $('addItemButton').addEventListener('click', () => {
        $('addItemModal').style.display = 'block';     
        $('modalBackground').style.display = 'block';
        $('addItemAjaxButtom').addEventListener('click', addItem);
    });

    $('itemIdAdd').addEventListener('focusout', async (e) => {
        let target = e.currentTarget;

        target.classList.remove('input-error');
        $('addItemAjaxButtom').disabled = false;
        $('itemIdErrorAlreadyExists').classList.add('hidden');
        $('itemIdErrorEmpty').classList.add('hidden');

        if (handleAddItemInputErrors(target.value === '', target, 'itemIdErrorEmpty')) return;

        const results = await find({itemId: e.currentTarget.value});
        if (handleAddItemInputErrors(results.length !== 0, target, 'itemIdErrorAlreadyExists')) return;
    });

    $('nameAdd').addEventListener('focusout', (e) => {
        let target = e.currentTarget;

        target.classList.remove('input-error');
        $('addItemAjaxButtom').disabled = false;
        $('nameErrorEmpty').classList.add('hidden');

        if (handleAddItemInputErrors(target.value === '', target, 'nameErrorEmpty')) return;
    });

    $('unitMeasurementAdd').addEventListener('focusout', (e) => {
        let target = e.currentTarget;

        target.classList.remove('input-error');
        $('addItemAjaxButtom').disabled = false;
        $('unitErrorEmpty').classList.add('hidden');

        if (handleAddItemInputErrors(target.value === '', target, 'unitErrorEmpty')) return;
    });

    $('quantityAdd').addEventListener('focusout', (e) => {
        let target = e.currentTarget;

        target.classList.remove('input-error');
        $('addItemAjaxButtom').disabled = false;
        $('quantityErrorEmpty').classList.add('hidden');

        if (handleAddItemInputErrors(target.value === '', target, 'quantityErrorEmpty')) return;
    });

    function handleAddItemInputErrors(error, element, errorMessageElementId) {
        if (error) {
            element.classList.add('input-error');
            $('addItemAjaxButtom').disabled = true;
            $(errorMessageElementId).classList.remove('hidden');
            return true;
        } else {
            element.classList.remove('input-error');
            $('addItemAjaxButtom').disabled = false;
            $(errorMessageElementId).classList.add('hidden');
            return false;
        }
    }

    async function addItem() {
        let filter = {
            itemId: $('itemIdAdd').value,
            name: $('nameAdd').value,
            unitMeasurement: $('unitMeasurementAdd').value,
            quantity: $('quantityAdd').value
        }
        $('itemIdAdd').value = '';
        $('nameAdd').value = '';
        $('unitMeasurementAdd').value = '';
        $('quantityAdd').value = '';
        const result = await add(filter);
        addItemToTable(result);
    }

}