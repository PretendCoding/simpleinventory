const $ = (elemId) => document.getElementById(elemId);

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
        $('nameUpdate').value = name;
        $('unitMeasurementUpdate').value = unitMeasurement;
        $('quantityUpdate').value = quantity;
        
    });
}

$('updateItemCloseButton').addEventListener('click', () => {
    $('updateItemModal').style.display = 'none';        
    $('modalBackground').style.display = 'none';
});