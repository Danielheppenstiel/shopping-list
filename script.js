// DOM Selectors

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const filter = document.getElementById('filter');
const clearBtn = document.getElementById('clear');
const formBtn = itemForm.querySelector('button');

let isEditMode = false;

// Functions

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach(item => {
        addItemToDOM(item);
    });

    checkUI();

}


    // Add List Item
function onAddItemSubmit(e) {
    // prevents page from submitting/page refreshing
    e.preventDefault();

    // Storing the input value in a variable
    const newItem = itemInput.value;

    // Validate Input
    if (newItem === '') {
        alert('Please Enter Valid Input');
        // retrun stops anything further from happening
        return;
    };

    // Check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if (checkIfItemExists(newItem)) {
            alert('This Item already exisit');
            return;
        };
    };

    // Create item DOM element
    addItemToDOM(newItem);

    // Add item to local storage
    addItemToStorage(newItem);

    checkUI();

    itemInput.value = '';

};

    // Add items to DOM
function addItemToDOM(item) {
    // Create List Item
        // Creates new li element 
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(item));
    
        const button = createButton('remove-item btn-link text-red');
        li.appendChild(button);
    
        itemList.appendChild(li);
};


    // Create a Button component
function createButton(classes) {

    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);

    return button;
};

    // Create Icon Component that will be a child of the button
function createIcon(classes) {

    const icon = document.createElement('i');
    icon.className = classes;

    return icon;

};

// Add items to local storage
function addItemToStorage(item) {
    // initalize empty variable
    const itemsFromStorage = getItemsFromStorage();

    // Add new item to array
    itemsFromStorage.push(item);

    // connvert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

};

    // remove items from local storage
function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    // filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    // Re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

};

    // Get items from local storage
function getItemsFromStorage() {
    // initalize empty variable
    let itemsFromStorage;

    // check local storage
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    };

    return itemsFromStorage;
};

    
function onClickItem(e) {

    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
        console.log(e.target);
    };

};

    // check if item alreay exist
function checkIfItemExists(item) {

    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);

};

    // Edit item
function setItemToEdit(item) {

    isEditMode = true;

    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');

    formBtn.innerHTML = '<i class="fa-solid fa-pen"</i>  Update Item';
    formBtn.style.backgroundColor = '#228b22';

    itemInput.value = item.textContent;


};

    // Remove list items
function removeItem(item) {

    if (confirm('Are you sure?')) {
        // Remove item from DOM
        item.remove();
        // Remove item from LS
        removeItemFromStorage(item.textContent);
        checkUI();
    };

    
};

    // Clear All List Items
function clearAll(e) {

    const childArr = Array.from(itemList.children);

    childArr.forEach(child => {
        child.remove();
    });

    // Clear From LS
    localStorage.clear();

    checkUI();
    
};

    // Filter list items
function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }

    })
};

    // Check UI 
function checkUI() {

    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        filter.style.display = 'none';
        clearBtn.style.display = 'none';
    } else {
        filter.style.display = 'block';
        clearBtn.style.display = 'block';
    };

    formBtn.innerHTML = '<i class="fa-solid fa-plus"</i> Add Item';
    formBtn.style.backgroundColor = '#333';

    isEditMode = false;
};

// initalize App
function init() {
    // EVENT LISTENERS

    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearAll);
    filter.addEventListener('input', filterItems);

    document.addEventListener('DOMContentLoaded', displayItems);


    checkUI();
}

init();