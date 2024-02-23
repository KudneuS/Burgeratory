function AddItemToStorage(name, content){
    localStorage.setItem(name, JSON.stringify(content));
}

function GetItemFromStorage(name){
    return JSON.parse(localStorage.getItem(name));
}

function RemoveItemFromStorage(name){
    localStorage.removeItem(name);
}