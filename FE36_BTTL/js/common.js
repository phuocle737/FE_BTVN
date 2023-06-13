export var getElement = function(id) {
    return document.querySelector('#' + id);
}

export var isEmpty = function(ele) {
    return ele === null || ele === "" || ele === undefined;
}
