const LS = {
    get: function(itemName) {
        return JSON.parse(localStorage.getItem(itemName) ?? "{}");
    },
    set: function(itemName, data) {
        return localStorage.setItem(itemName, JSON.stringify(data));
    },
    remove: function(itemName) {
        localStorage.removeItem(itemName);
    }
}

export default LS;