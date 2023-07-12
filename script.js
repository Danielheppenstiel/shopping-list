// DOM Selectors

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

// Functions

    // Add List Item
function addItem(e) {
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

    // Create List Item
        // Creates new li element 
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);

    itemInput.value = '';

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

// EVENT LISTENERS

itemForm.addEventListener('submit', addItem);