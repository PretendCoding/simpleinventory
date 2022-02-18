// window.sessionStorage.tableData
import { $ } from "./utilities.js";
import { addItemToTable } from "./createInventoryTable.js";

const stateChange = setInterval(() => {
    if (document.readyState == 'complete'){
        clearInterval(stateChange);
        main();
    }
}, 100);

function main() {

    $('tableSearch').value = '';

    let itemsTemp = document.querySelector('[data-inventory-container]').childNodes;
    
    ////// Click Events
    
    $('tableSearch').addEventListener('input', () => {
        const rawData = JSON.parse(window.sessionStorage.tableData);

        let items = [];
        itemsTemp.forEach(item => {
            items.push({
                elem: item,
                _id: item._id
            });
        });

        let value = $('tableSearch').value;

        if (value == '' || value == null || value == undefined) {
            items.forEach(item => {
                item.elem.classList.remove('hidden');
            });
        } else {
            items.forEach(item => {
                item.elem.classList.add('hidden');
                console.log('hello')
            });
        }

        items.forEach(item => {

            const elemName = item.elem.querySelector('[data-name]').textContent;
            const elemId = item.elem.querySelector('[data-itemId]').textContent;

            if (elemName.toLowerCase().includes(value.toLowerCase()) || elemId.toLowerCase().includes(value.toLowerCase())) {
                item.elem.classList.remove('hidden');
            }
        })

    });
}